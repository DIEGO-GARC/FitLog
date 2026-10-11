using System.ComponentModel.DataAnnotations.Schema;

namespace FitLog.Domain.Entities;

public class Exercise
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public int? RoutineId { get; set; }
    
    [ForeignKey("RoutineId")]
    public Routine? Routine { get; set; }
    

}