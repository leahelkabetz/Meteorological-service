using System;
using System.Collections.Generic;

namespace Dal.Models;

public partial class Station
{
    public int IdStation { get; set; }

    public string? StationAddress { get; set; }

    public string? Town { get; set; }

    public string? ManagerName { get; set; }
}
