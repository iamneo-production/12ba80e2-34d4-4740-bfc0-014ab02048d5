using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;
namespace WebApp.Controller{
    [Route("")]
    [ApiController]
    public class AdminController: ControllerBase{ 
         private readonly AppDbContext _context;
         // Student Controller
        public UserController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Institute
        [HttpGet("admin/viewInstitutes")]
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
    }

