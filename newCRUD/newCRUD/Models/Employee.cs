using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace newCRUD.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public string EmployeeName { get; set; }
        public string Departement { get; set; }
        public string Email { get; set; }
        public string DOJ { get; set; }
    }
}
