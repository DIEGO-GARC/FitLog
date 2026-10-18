using System.ComponentModel.DataAnnotations.Schema;

namespace FitLog.Domain.Entities;

public class Routine
{
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;

}