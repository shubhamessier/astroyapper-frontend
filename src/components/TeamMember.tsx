import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import type { TeamMember as TeamMemberType } from "../data/team";

interface TeamMemberProps {
  member: TeamMemberType;
}

export function TeamMember({ member }: TeamMemberProps) {
  const { name, role, bio, avatarUrl, avatarFallback } = member;
  
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <Avatar className="h-24 w-24 border-2 border-rose-100">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-sans text-xl tracking-[-0.05em] text-gray-900 mb-2">
          {name}, {role}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {bio}
        </p>
      </div>
    </div>
  );
}