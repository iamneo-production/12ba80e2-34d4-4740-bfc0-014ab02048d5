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
        // PUT: api/Institute/5
        [HttpPut("admin/editInstitute/{id}")]
        public async Task<IActionResult> PutInstitute(int id, Institute institute)
        {
            if (id != institute.instituteId)
            {
                return BadRequest();
            }
            _context.Entry(institute).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstituteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
    }
}