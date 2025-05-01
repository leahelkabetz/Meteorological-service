using System;
using System.Collections.Generic;

namespace Bl.Models;

public partial class BlStation
{
    public int IdStation { get; set; }

    public string? StationAddress { get; set; }

    public string? Town { get; set; }

    public string? ManagerName { get; set; }

}
