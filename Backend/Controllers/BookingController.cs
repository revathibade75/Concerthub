using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BookingController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult BookTicket(BookingDto bookingDto)
    {
        var eventObj =
            _context.Events.Find(bookingDto.EventId);

        if (eventObj == null)
        {
            return BadRequest("Event Not Found");
        }

        Booking booking = new Booking
        {
            UserId = bookingDto.UserId,
            EventId = bookingDto.EventId,
            TicketCount = bookingDto.TicketCount,
            TotalAmount =
                bookingDto.TicketCount * eventObj.Price,
            BookingDate = DateTime.Now
        };

        _context.Bookings.Add(booking);
        _context.SaveChanges();

        return Ok("Ticket Booked");
    }

    [HttpGet("user/{userId}")]
public IActionResult BookingHistory(int userId)
{
    var bookings = _context.Bookings
        .Where(b => b.UserId == userId)
        .Join(
            _context.Events,
            booking => booking.EventId,
            evt => evt.EventId,
            (booking, evt) => new { booking, evt }
        )
        .Join(
            _context.Users,
            be => be.booking.UserId,
            user => user.UserId,
            (be, user) => new
            {
                be.booking.BookingId,
                be.booking.UserId,
                UserName = user.Name,
                Email = user.Email,

                be.booking.EventId,
                EventName = be.evt.EventName,
                Artist = be.evt.Artist,
                Venue = be.evt.Venue,

                be.booking.TicketCount,
                be.booking.TotalAmount,
                be.booking.BookingDate
            }
        )
        .ToList();

    return Ok(bookings);
}

[HttpGet("all")]
public IActionResult GetAllBookings()
{
    var bookings = _context.Bookings
        .Join(
            _context.Events,
            booking => booking.EventId,
            evt => evt.EventId,
            (booking, evt) => new { booking, evt }
        )
        .Join(
            _context.Users,
            be => be.booking.UserId,
            user => user.UserId,
            (be, user) => new
            {
                be.booking.BookingId,
                be.booking.UserId,
                UserName = user.Name,
                Email = user.Email,

                be.booking.EventId,
                EventName = be.evt.EventName,
                Artist = be.evt.Artist,
                Venue = be.evt.Venue,

                be.booking.TicketCount,
                be.booking.TotalAmount,
                be.booking.BookingDate
            }
        )
        .ToList();

    return Ok(bookings);
}
}