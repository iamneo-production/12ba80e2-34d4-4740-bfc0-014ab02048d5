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


        // PUT: api/Institute/5
        [HttpPut("PutInstitute/{id}")]
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

        // POST: api/Institute
        [HttpPost("PostInstitute")]
        public async Task<ActionResult<Institute>> PostInstitute(Institute institute)
        {
            _context.Institutes.Add(institute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstitute", new { id = institute.instituteId }, institute);
        }
        // DELETE: api/Institute/5
        [HttpDelete("DeleteInstitute/{id}")]
        public async Task<IActionResult> DeleteInstitute(int id)
        {
            var institute = await _context.Institutes.FindAsync(id);
            if (institute == null)
            {
                return NotFound();
            }
            _context.Institutes.Remove(institute);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

