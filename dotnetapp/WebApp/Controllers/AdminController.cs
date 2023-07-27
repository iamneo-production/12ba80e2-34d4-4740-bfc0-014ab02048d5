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
        // Course Controller
         public AdminController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Course
        [HttpGet("GetCourse")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return await _context.Courses.ToListAsync();
        }
        //GET: api/Course/5
        [HttpGet("GetCourse/{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            return course;
        }
        // PUT: api/Course/5
        [HttpPut("PutCourse/{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.courseId)
            {
                return BadRequest();
            }
            _context.Entry(course).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
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

        // POST: api/Course
        [HttpPost("PostCourse")]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCourse", new { id = course.courseId }, course);
        }

        // DELETE: api/Course/5
        [HttpDelete("DeleteCourse/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.courseId == id);
        }

        //InstituteController
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
        [HttpDelete("DeleteAcademyCourse/{id}")]
        public async Task <IActionResult> DeleteAcademyCourses(int id)
        {
            var courses = _context.Courses.Where(c => c.instituteID == id);
            if (courses==null || !courses.Any())
            {
                return NotFound();
            }
            _context.Courses.RemoveRange(courses);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool InstituteExists(int id)
        {
            return _context.Institutes.Any(e => e.instituteId == id);
        }
    }
}
