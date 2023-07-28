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
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController: ControllerBase{ 
        private readonly AppDbContext _context;

         public AdminController(AppDbContext context)
        {
            _context = context;
        }
         // GET: api/Institute
        [HttpGet("GetInstitute")]
        public async Task<ActionResult<IEnumerable<Institute>>> GetInstitute()
        {
            return await _context.Institutes.ToListAsync();
        }

        // GET: api/Institute/5
        [HttpGet("GetInstituteID/{id}")]
        public async Task<ActionResult<Institute>> GetInstitute(int id)
        {
            var institute = await _context.Institutes.FindAsync(id);

            if (institute == null)
            {
                return NotFound();
            }

            return institute;
        }


        
        // POST: api/Institute
        [HttpPost("PostInstitute")]
        public async Task<ActionResult<Institute>> PostInstitute(Institute institute)
        {
            _context.Institutes.Add(institute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstitute", new { id = institute.instituteId }, institute);
        }
        [HttpPut("admin/editStudent/{id}")]
        public async Task<IActionResult> PutStudent(int id, Student student)
        {
            if (id != student.id)
            {
                return BadRequest();
            }

            _context.Entry(student).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
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
}

