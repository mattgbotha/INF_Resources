namespace Architecture.Models
{
    public interface ICourseRepository
    {
        Task<bool> SaveChangesAsync();
        void Add<T>(T entity) where T : class; 
        void Delete<T>(T entity) where T : class;

        // Course
        Task<Course[]> GetAllCourseAsync();
        Task<Course> GetCourseAsync(int courseId);


    }
}
