using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EventController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllEvents()
    {
        return Ok(_context.Events.ToList());
    }

    [HttpGet("search")]
    public IActionResult Search(string keyword)
    {
        var events = _context.Events
            .Where(x =>
                x.EventName.Contains(keyword) ||
                x.Artist.Contains(keyword))
            .ToList();

        return Ok(events);
    }
}