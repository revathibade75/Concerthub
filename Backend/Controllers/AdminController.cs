using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("event")]
    public IActionResult AddEvent([FromBody] Event eventObj)
    {
        _context.Events.Add(eventObj);
        _context.SaveChanges();

        return Ok("Event Added");
    }
    [HttpPut("event/{id}")]
public IActionResult UpdateEvent(
    int id,
    [FromBody] Event updatedEvent)
{
    var existingEvent =
        _context.Events.Find(id);

    if (existingEvent == null)
    {
        return NotFound("Event not found");
    }

    existingEvent.EventName =
        updatedEvent.EventName;

    existingEvent.Artist =
        updatedEvent.Artist;

    existingEvent.Date =
        updatedEvent.Date;

    existingEvent.Venue =
        updatedEvent.Venue;

    existingEvent.Price =
        updatedEvent.Price;

    existingEvent.ImageUrl =
        updatedEvent.ImageUrl;

    _context.SaveChanges();

    return Ok("Event Updated Successfully");
}
    [HttpDelete("event/{id}")]
    public IActionResult DeleteEvent(int id)
    {
        var eventObj = _context.Events.Find(id);

        if (eventObj == null)
            return NotFound();

        _context.Events.Remove(eventObj);

        _context.SaveChanges();

        return Ok("Event Deleted");
    }
}