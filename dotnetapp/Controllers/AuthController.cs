using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using dotnetapp.Context;
using dotnetapp.Models;
using System.Threading.Tasks;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;


namespace dotnetapp.Controller{
    [Route("")]
    [ApiController]
    public class AuthController: ControllerBase{ 
        private readonly AppDbContext _authContext;

        public AuthController(AppDbContext appDbContext){
            _authContext=appDbContext;
        }
    [HttpPost("user/login")]
        public async Task<IActionResult> login([FromBody] Login obj){
        if (obj == null) return BadRequest();
        var user=await _authContext.Users.FirstOrDefaultAsync(x=> x.email==obj.email && x.password==obj.password);
        var admin=await _authContext.Admins.FirstOrDefaultAsync(x=> x.email==obj.email && x.password==obj.password);
        
        if(user != null){
            obj.Token = user.Token = createJwt(user);
            return CreatedAtAction("GetLogin", new { id = obj.Id },obj); 
        } 
        else if(admin != null){
            obj.Token=admin.Token = createJwt(admin);
            return CreatedAtAction("GetLogin", new { id = obj.Id },obj);
        }
        else return NotFound();
    }

    
    
    [HttpPost("user/signup")]
     public async Task<IActionResult> saveUser([FromBody] User userObj){
        if(userObj==null) return BadRequest(new {Message="user is null"});
        if (await CheckEmailExistUser(userObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        if (await CheckEmailExistAdmin(userObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        await _authContext.Users.AddAsync(userObj);
        await _authContext.SaveChangesAsync();
        return Ok(new{ Message = "User Registered" });
    }
    [HttpPost("admin/signup")]
     public async Task<IActionResult> saveAdmin([FromBody] Admin adminObj){
        if(adminObj==null) return BadRequest(new {Message="admin is null"});
        if (await CheckEmailExistAdmin(adminObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        if (await CheckEmailExistUser(adminObj.email)) return BadRequest(new { Message = "Eamil Already Exist!!! " });
        await _authContext.Admins.AddAsync(adminObj);
        await _authContext.SaveChangesAsync();
        return Ok(new{Message = "Admin Registered :)"});
     }
        
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _authContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _authContext.Users.Remove(user);
            await _authContext.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("deleteAdmin/{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _authContext.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            _authContext.Admins.Remove(admin);
            await _authContext.SaveChangesAsync();
            return NoContent();
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
        [HttpGet("GetAdmin/{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(int id)
        {
            var admin = await  _authContext.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }
        [HttpGet("GetUser/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await  _authContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [HttpGet("GetDetails/{id}")]
        public async Task<ActionResult<Login>> GetLogin(int id)
        {
            var obj = await _authContext.Logins.FindAsync(id);
            if (obj == null)
            {
                return NotFound();
            }
            return obj;
        }
    }
}