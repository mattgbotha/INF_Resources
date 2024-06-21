//if you wanted to filter the GetAllCourses method:

[HttpGet]
[Route("GetCourses")]
public async Task<IActionResult> GetCourses(string nameFilter = null)
{
    try
    {
        var results = await _courseRepository.GetCoursesAsync(nameFilter);
        return Ok(results);
    }
    catch (Exception)
    {
        return StatusCode(500,"Internal Server Error. Please contact support.");
    }
}

//Update CourseRepository:
public async Task<IEnumerable<Course>> GetCoursesAsync(string nameFilter = null)
{
    if (string.IsNullOrEmpty(nameFilter))
        return await _context.Courses.ToListAsync();
    else
        return await _context.Courses.Where(c => c.Name.Contains(nameFilter)).ToListAsync();
}

