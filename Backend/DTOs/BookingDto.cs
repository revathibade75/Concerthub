namespace Backend.DTOs;

public class BookingDto
{
    public int UserId { get; set; }

    public int EventId { get; set; }

    public int TicketCount { get; set; }
}