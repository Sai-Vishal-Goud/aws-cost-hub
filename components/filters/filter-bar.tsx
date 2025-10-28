import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Tag, X } from "lucide-react"

const activeFilters = [
  { label: "Last 30 days", icon: Calendar },
  { label: "Production", icon: Tag },
  { label: "us-east-1", icon: MapPin },
]

export function FilterBar() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-[#e5e7eb] rounded-md">
      <span className="text-sm font-medium text-[#545b64]">Filters:</span>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => {
          const Icon = filter.icon
          return (
            <Badge
              key={filter.label}
              variant="secondary"
              className="gap-1.5 pr-1 bg-[#f0f7ff] text-[#0972d3] border-[#0972d3]/20"
            >
              <Icon className="h-3 w-3" />
              {filter.label}
              <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )
        })}
      </div>

      <Button variant="outline" size="sm" className="ml-auto text-xs bg-transparent">
        Add filter
      </Button>
      <Button variant="ghost" size="sm" className="text-xs">
        Clear all
      </Button>
    </div>
  )
}
