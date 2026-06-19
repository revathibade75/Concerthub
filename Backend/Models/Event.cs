namespace Backend.Models;

public class Event
{
    public int EventId { get; set; }

    public string? EventName { get; set; }

    public string? Artist { get; set; }

    public DateTime Date { get; set; }

    public string? Venue { get; set; }

    public decimal Price { get; set; }

    public string? ImageUrl { get; set; }
}