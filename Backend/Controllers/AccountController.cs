using Backend.DTOs;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AccountController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public IActionResult Register(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();

        return Ok("User Registered Successfully");
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto login)
    {
        var user = _context.Users
            .FirstOrDefault(x =>
                x.Email == login.Email &&
                x.Password == login.Password);

        if (user == null)
        {
            return BadRequest("Invalid Credentials");
        }

        return Ok(user);
    }
}