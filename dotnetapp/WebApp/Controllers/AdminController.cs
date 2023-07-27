using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;

namespace WebApp.Controller{
    [Route("")]
    [ApiController]
    public class AdminController: ControllerBase{ 
        private readonly AppDbContext _context;
         public AdminController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet("admin/viewInstitutes")]
        public async Task<ActionResult<IEnumerable<Institute>>> GetInstitute()
        {
            return await _context.Institutes.ToListAsync();
        }
    }
}