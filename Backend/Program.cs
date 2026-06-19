using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ======================
// Add Services
// ======================

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ======================
// CORS Configuration
// ======================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ======================
// MySQL Connection
// ======================

string connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    ));

var app = builder.Build();

// ======================
// Middleware Pipeline
// ======================

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

// Uncomment if using HTTPS
// app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowFrontend");

// Authorization
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();