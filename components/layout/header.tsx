"use client"

import { Search, Bell, HelpCircle, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onToggleAgent: () => void
  agentOpen: boolean
}

export function Header({ onToggleAgent, agentOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white">
      <div className="flex h-14 items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold text-[#232f3e]">Cost Optimization Hub</div>
        </div>

        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search accounts, services, workloads..."
              className="pl-9 bg-[#f7f7f8] border-[#e5e7eb]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleAgent} className={agentOpen ? "bg-accent" : ""}>
            <Sparkles className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="text-sm">us-east-1</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>us-east-1</DropdownMenuItem>
              <DropdownMenuItem>us-west-2</DropdownMenuItem>
              <DropdownMenuItem>eu-west-1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Account: 123456789012</DropdownMenuItem>
              <DropdownMenuItem>Switch account</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
