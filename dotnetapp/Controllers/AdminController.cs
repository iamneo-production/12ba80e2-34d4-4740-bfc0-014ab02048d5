using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Context;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;

namespace dotnetapp.Controller{
    [Route("")]
    [ApiController]
    public class AdminController: ControllerBase{ 
        private readonly AppDbContext _context;
        // Course Controller
         public AdminController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Course
        [HttpGet("admin/viewCourse")]
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
        [HttpPut("admin/editCourse/{id}")]
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
        [HttpPost("admin/addCourse")]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCourse", new { id = course.courseId }, course);
        }

        // DELETE: api/Course/5
        [HttpDelete("admin/deleteCourse/{id}")]
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

        // POST: api/Institute
        [HttpPost("admin/addInstitute")]
       public async Task<ActionResult<Institute>> PostInstitute(Institute institute)
        {
            _context.Institutes.Add(institute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInstitute", new { id = institute.instituteId }, institute);
        }
        // DELETE: api/Institute/5
        [HttpDelete("admin/deleteInstitutes/{id}")]
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
        //Admin Student

        [HttpGet("admin/ViewStudent")]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudent()
        {
            return await _context.Students.ToListAsync();
        }


        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Student
        [HttpPost("admin/addStudent")]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {   
            _context.Students.Add(student);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.id }, student);
        }


        // DELETE: api/Student/5
        [HttpDelete("admin/deleteStudent/{id}")]
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

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.id == id);
        }

    }
}