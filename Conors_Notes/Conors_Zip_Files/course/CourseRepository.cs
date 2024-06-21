using Architecture.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace Architecture.Models
{
    public class CourseRepository : ICourseRepository
    {
        private readonly AppDbContext _appDbContext;

        public CourseRepository(AppDbContext appDbContext)
        {
                _appDbContext = appDbContext;
        }
        public async Task<Course[]> GetAllCourseAsync()
        {
            IQueryable<Course> query = _appDbContext.Courses;
            return await query.ToArrayAsync();
        }

        public async Task<CourseViewModel> GetCourseAsync(int CourseId)
        {
            CourseViewModel course = new CourseViewModel();

            Course query = await _appDbContext.Courses.Where(x=> x.CourseId == CourseId).FirstOrDefaultAsync();

            if(query == null)
            {
                course.response = 404;
            }
            else
            {
                course.CourseId = query.CourseId;
                course.Name = query.Name;
                course.Description = query.Description;
                course.Duration= query.Duration;
                course.response = 200;
            }
            return course;

        }

        public async Task<int> AddCourseAsync(CourseViewModel course)
        {
            int code = 200;
            try
            {
                Course courseAdd = new Course();
                courseAdd.Name = course.Name;
                courseAdd.Description = course.Description;
                courseAdd.Duration = course.Duration;
                await _appDbContext.Courses.AddAsync(courseAdd);
                await _appDbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                code = 500;
            }
            return code;
        }

        public async Task<int> UpdateCourseAsync(int courseId, CourseViewModel course)
        {
            int code = 200;
            //Find the object in the db 
            Course attemptToFindInDb = await _appDbContext.Courses.Where(x => x.CourseId == courseId).FirstOrDefaultAsync();
            if(attemptToFindInDb == null)
            {
                code = 404;
            }
            else
            {
                attemptToFindInDb.Name = course.Name;
                attemptToFindInDb.Duration= course.Duration;
                attemptToFindInDb.Description = course.Description;
                _appDbContext.Courses.Update(attemptToFindInDb);
                await _appDbContext.SaveChangesAsync();
            }
            return code;
        }

        public async Task<int> DeleteCourseAsync(int courseId)
        {
            int code = 200;

            //Find the object in the db 
            Course attemptToFindInDb = await _appDbContext.Courses.Where(x => x.CourseId == courseId).FirstOrDefaultAsync();

            if (attemptToFindInDb == null)
            {
                code = 404;
            }
            else 
            { 
                _appDbContext.Courses.Remove(attemptToFindInDb);
                await _appDbContext.SaveChangesAsync();
            }
            return code;
        }













    }
}
