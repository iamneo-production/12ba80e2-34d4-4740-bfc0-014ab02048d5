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
    public class UserController: ControllerBase{ 
         private readonly AppDbContext _context;
         // Student Controller
        public UserController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Student
        [HttpGet("GetStudents")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("user/ViewAdmission")]
        public async Task<ActionResult<IEnumerable<Student>>> ViewAdmission()
        {
            return await _context.Students.ToListAsync();
        }
        // GET: api/Student/5
        [HttpGet("GetStudents/{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("updateStudent/{id}")]
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

        // POST: api/Student
        [HttpPost("postStudent")]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {   
            _context.Students.Add(student);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.id }, student);
        }
        [HttpPost("checkCourseExists")]
        public async Task<ActionResult<bool>> CheckCourseExists(checkAlreadyEnrolledCourse obj)
        {   
            bool courseExists = await CheckCourseExist(obj.userID, obj.courseID);
            return courseExists;
        }


        // DELETE: api/Student/5
        [HttpDelete("deleteStudent/{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("user/viewStatus")]
        public async Task<ActionResult<IEnumerable<Institute>>> GetInstitute()
        {
            return await _context.Institutes.ToListAsync();
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.id == id);
        }

         private Task<bool> CheckCourseExist(int userID,int courseID )
        {
             return (_context.Students.AnyAsync(x => x.userID == userID && x.courseID == courseID));  
        }
    }
}