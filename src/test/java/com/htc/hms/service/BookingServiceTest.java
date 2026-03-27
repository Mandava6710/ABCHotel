package com.htc.hms.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.apiguardian.api.API;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Spy;
import org.mockito.internal.matchers.Any;
import org.mockito.junit.jupiter.MockitoExtension;

import com.htc.hms.dao.BookingDAO;
import com.htc.hms.exception.BusinessException;
import com.htc.hms.model.BookingRequest;
import com.htc.hms.model.Room;
import com.htc.hms.util.CurrencyConverter;


@ExtendWith(MockitoExtension.class)
class BookingServiceTest {
	
@InjectMocks
	private BookingService bookingService;
	@Mock
	private PaymentService paymentServicemock;
	@Mock
	private RoomService roomServicemock;
	@Spy
	private BookingDAO bookingDAOmock;
	@Mock
	private MailSender mailSendermock;
	@Captor
	private ArgumentCaptor<Double> priceCaptor;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	/*
	 * @BeforeEach void setUp() throws Exception {
	 * 
	 * this.paymentServicemock=mock(PaymentService.class);
	 * this.mailSendermock=mock(MailSender.class);
	 * this.bookingDAOmock=spy(BookingDAO.class);
	 * this.roomServicemock=mock(RoomService.class); this.bookingService=new
	 * BookingService(paymentServicemock,roomServicemock,bookingDAOmock,
	 * mailSendermock); this.priceCaptor=ArgumentCaptor.forClass(Double.class);
	 * 
	 * 
	 * System.out.println(roomServicemock.getAvailableRooms());
	 * System.out.println(roomServicemock.getRoomCount());
	 * System.out.println(roomServicemock.findAvailableRoomId(null));
	 * 
	 * 
	 * }
	 */

	@AfterEach
	void tearDown() throws Exception {
	}

	@Test
	void should_returnCorrectPrice_when_correctInput() {
		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 05),
				2, false);
		double expected = 4 * 2 * 50.0;

		double actual = bookingService.calculatePrice(bookingRequest);

		assertEquals(expected, actual);

	}

	@Test
	void should_CountofAvailablePlace() {
		int expected = 0;

		int actual = bookingService.getAvailablePlaceCount();

		assertEquals(expected, actual);

	}

	@Test
	void should_CountofAvailablePlacewithcustomVal() {

		when(this.roomServicemock.getAvailableRooms()).thenReturn(Collections.singletonList(new Room("2.4", 4)));

		int expected = 4;
		int actual = bookingService.getAvailablePlaceCount();

		assertEquals(expected, actual);

	}

	@Test
	void should_CountofAvailablePlacewithcustomValMultiList() {
		List<Room> rooms = Arrays.asList(new Room("2.4", 4), new Room("2.6", 5));

		when(this.roomServicemock.getAvailableRooms()).thenReturn(rooms);

		int expected = 9;
		int actual = bookingService.getAvailablePlaceCount();

		assertEquals(expected, actual);

	}

	@Test
	void should_CountofAvailablePlacewithcustomValMultiThenReturn() {
		List<Room> rooms = Arrays.asList(new Room("2.4", 4), new Room("2.6", 5));

		when(this.roomServicemock.getAvailableRooms()).thenReturn(rooms)
				.thenReturn(Collections.singletonList(new Room("2.4", 4)));

		int expected1 = 9;
		int expected2 = 4;
		int actual1 = bookingService.getAvailablePlaceCount();
		int actual2 = bookingService.getAvailablePlaceCount();

		assertAll(() -> assertEquals(expected1, actual1), () -> assertEquals(expected2, actual2));

	}

	@Test
	void should_ThrowException_when_NoRoomAvailable() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 05),
				2, false);
		BookingRequest bookingRequest2 = new BookingRequest("2", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 05),
				2, false);
		when(this.roomServicemock.findAvailableRoomId(any(BookingRequest.class))).thenThrow(BusinessException.class);

		assertThrows(BusinessException.class, () -> bookingService.makeBooking(bookingRequest2));

	}

	@Test
	void should_ThrowException_when_priceToohigh() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, true);

		when(this.paymentServicemock.pay(any(), eq(300.0))).thenThrow(BusinessException.class);

		assertThrows(BusinessException.class, () -> bookingService.makeBooking(bookingRequest));

	}

	@Test
	void shouuld_Invokepayment_when_prepaid() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, true);
		// BookingRequest bookingRequest2=new BookingRequest("2", LocalDate.of(2025, 01,
		// 01), LocalDate.of(2025, 01, 04),2,true);

		// when(this.paymentServicemock.pay(any(),eq(300.0))).thenThrow(BusinessException.class);

		bookingService.makeBooking(bookingRequest);
		bookingService.makeBooking(bookingRequest);

		verify(paymentServicemock, times(2)).pay(bookingRequest, 300.0);
		// verifyNoInteractions(paymentServicemock);
	}

	@Test
	void should_Makebooking_when_InputOK() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, false);
		// BookingRequest bookingRequest2=new BookingRequest("2", LocalDate.of(2025, 01,
		// 01), LocalDate.of(2025, 01, 04),2,true);

		// when(this.paymentServicemock.pay(any(),eq(300.0))).thenThrow(BusinessException.class);

		String bookingId = bookingService.makeBooking(bookingRequest);
		verify(bookingDAOmock).save(bookingRequest);

		System.out.println("Booking Id" + bookingId);

	}

	@Test
	void should_Cancelbooking_when_InputOK() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, false);

		bookingRequest.setRoomId("2.2");
		String bookingId = "1";

		doReturn(bookingRequest).when(bookingDAOmock).get(bookingId);

		bookingService.cancelBooking(bookingId);

		// System.out.println("Booking Id"+bookingId);

	}

	@Test
	void should_ThrowException_when_mailIsnotready() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, false);

		doThrow(UnsupportedOperationException.class).when(mailSendermock).sendBookingConfirmation(any());

		// Mockito.when(this.mailSendermock.sendBookingConfirmation(any())).thenThrow(BusinessException.class);
		Executable executable = () -> bookingService.makeBooking(bookingRequest);
		assertThrows(UnsupportedOperationException.class, executable);

		// System.out.println("Booking Id"+bookingId);

	}

	@Test
	void should_NotThrowException_when_mailIsready() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, false);

		// doNothing().when(mailSendermock).sendBookingConfirmation(any());

		// Mockito.when(this.mailSendermock.sendBookingConfirmation(any())).thenThrow(BusinessException.class);
		Executable executable = () -> bookingService.makeBooking(bookingRequest);
		// assertThrows(UnsupportedOperationException.class, executable);
		assertDoesNotThrow(executable);

		// System.out.println("Booking Id"+bookingId);

	}

	@Test
	void should_PayCorrectPrice_when_InputOk() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, true);

		// assertThrows(BusinessException.class, ()->
		bookingService.makeBooking(bookingRequest);
		verify(paymentServicemock).pay(eq(bookingRequest), priceCaptor.capture());
		double actualPrice = priceCaptor.getValue();
		System.out.println(actualPrice);
		assertEquals(300.0, actualPrice);

	}

	@Test
	void should_PayCorrectPrice_when_InputOkMultiplecalls() {

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, true);

		BookingRequest bookingRequest2 = new BookingRequest("2", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 05),
				2, true);

		List<Double> expectedValues = Arrays.asList(300.0, 400.0);

		// assertThrows(BusinessException.class, ()->
		bookingService.makeBooking(bookingRequest);
		bookingService.makeBooking(bookingRequest2);

		verify(paymentServicemock, times(2)).pay(any(BookingRequest.class), priceCaptor.capture());
		List<Double> actualPrice = priceCaptor.getAllValues();
		System.out.println(actualPrice);
		assertEquals(expectedValues, actualPrice);

	}
	

	@Test
	void should_CalculatePrice_convert_Euro_when_inputOk() {
		
		try(MockedStatic<CurrencyConverter> mockedConverter=mockStatic(CurrencyConverter.class)){

		BookingRequest bookingRequest = new BookingRequest("1", LocalDate.of(2025, 01, 01), LocalDate.of(2025, 01, 04),
				2, true);
		double expected=300.0;
		mockedConverter.when(()->CurrencyConverter.toEuro(anyDouble())).thenReturn(300.0);
		
		double actual=bookingService.calculatePriceEuro(bookingRequest);
		assertEquals(expected, actual);

		
		}
		

	}
	
	@Test
	void should_CountofAvailablePlacewithfinalstub() {
		List<Room> rooms = Arrays.asList(new Room("2.4", 4), new Room("2.6", 5));

		when(this.roomServicemock.getAvailableRooms()).thenReturn(rooms);
				
		int expected1 = 9;
		
		int actual1 = bookingService.getAvailablePlaceCount();
		

		 assertEquals(expected1, actual1);

	}


}
