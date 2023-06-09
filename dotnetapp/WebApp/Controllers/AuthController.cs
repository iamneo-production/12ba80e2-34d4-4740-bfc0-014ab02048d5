using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using WebApp.Context;
using WebApp.Models;
using System.Threading.Tasks;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace WebApp.Controller{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase{ 
        private readonly AppDbContext _authContext;

        public AuthController(AppDbContext appDbContext){
            _authContext=appDbContext;
        }
    [HttpPost("userLogin")]
     public async Task<IActionResult> isUserPresent([FromBody] Login obj){
        if (obj == null) return BadRequest();
    
        var user=await _authContext.Users.FirstOrDefaultAsync(x=> x.email==obj.email && x.password==obj.password);
        if(user == null) return NotFound(new { Message = "User Not Found! " });
        user.Token = createJwt(user);
        return Ok(new{ Message="User Logged in Successfully!", userRole="USER",Token=user.Token });
    }
    [HttpPost("adminLogin")]
     public async Task<IActionResult> isAdminPresent([FromBody] Login obj){
        if (obj == null) return BadRequest();
        var admin=await _authContext.Admins.FirstOrDefaultAsync(x=> x.email==obj.email && x.password==obj.password);
        if(admin == null) return NotFound(new { Message = "Admin Not Found! " });
         admin.Token = createJwt(admin);
        return Ok(new {Message="Admin Logged in Successfully!", userRole="ADMIN", Token=admin.Token});
    } 
    
    [HttpPost("userRegister")]
     public async Task<IActionResult> saveUser([FromBody] User userObj){
        if(userObj==null) return BadRequest(new {Message="user is null"});
        if (await CheckEmailExistUser(userObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        if (await CheckEmailExistAdmin(userObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        await _authContext.Users.AddAsync(userObj);
        await _authContext.SaveChangesAsync();
        return Ok(new{ Message = "User Registered" });
    }
    [HttpPost("adminRegister")]
     public async Task<IActionResult> saveAdmin([FromBody] Admin adminObj){
        if(adminObj==null) return BadRequest(new {Message="admin is null"});
        if (await CheckEmailExistAdmin(adminObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        if (await CheckEmailExistUser(adminObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        await _authContext.Admins.AddAsync(adminObj);
        await _authContext.SaveChangesAsync();
        return Ok(new{Message = "Admin Registered :)"});
     }

     private string createJwt(User user){
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("veryverysecret.....");
        var identity = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Role, user.userRole),
            new Claim(ClaimTypes.NameIdentifier,Convert.ToString(user.Id))
        });
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new SecurityTokenDescriptor{
            Subject = identity,
            Expires =DateTime.Now.AddDays(1),
            SigningCredentials = credentials
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        return jwtTokenHandler.WriteToken(token);
     }
      private string createJwt(Admin admin){
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("veryverysecret.....");
        var identity = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Role, admin.userRole),
            new Claim(ClaimTypes.NameIdentifier,Convert.ToString(admin.Id))
        });
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
        var tokenDescriptor = new SecurityTokenDescriptor{
            Subject = identity,
            Expires =DateTime.Now.AddDays(1),
            SigningCredentials = credentials
        };
        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        return jwtTokenHandler.WriteToken(token);
     }
        private Task<bool> CheckEmailExistUser(string Email)
        {
             return (_authContext.Users.AnyAsync(x => x.email == Email));  
        }
        private Task<bool> CheckEmailExistAdmin(string Email)
        {
             return (_authContext.Admins.AnyAsync(x => x.email == Email));  
        }
    //   [Authorize]
      [HttpGet("allUsers")]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }
        // [Authorize]
        [HttpGet("allAdmins")]
         public async Task<ActionResult<Admin>> GetAllAdmins()
        {
            return Ok(await _authContext.Admins.ToListAsync());
        }
    }
}