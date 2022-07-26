using System.ComponentModel.DataAnnotations;

namespace aspnetserver.Data
{
    internal sealed class Objava // vidljiva samo u ovom projektu i ne može se nasljeđivati
    {
        [Key]
        public int ObjavaId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Naslov { get; set; } = string.Empty;

        [Required]
        [MaxLength(10000)]
        public string Sadrzaj { get; set; } = string.Empty;
    }
}
