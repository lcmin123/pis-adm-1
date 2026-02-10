import { ChevronDownIcon, ChevronUpIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';
import { memo, useCallback, useState } from 'react';

const SidebarGroup = memo(({ group, isOpen, onToggle }) => {
  return (
    <li>
      <div
        className="flex cursor-pointer items-center justify-between text-[1.1rem] font-bold text-gray-800"
        onClick={() => onToggle(group.title)}
      >
        <span>{group.title}</span>
        {isOpen ? (
          <ChevronUpIcon className="size-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="size-5 text-gray-500" />
        )}
      </div>
      {isOpen && (
        <ul className="mt-2 ml-2 space-y-2 border-l-2 border-gray-200 pl-4 font-normal text-gray-600">
          {group.items.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="block cursor-pointer text-sm transition-all hover:font-bold hover:text-[#164194]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

export default function Sidebar({ menuData }) {
  // Initialize all groups as open by default, or you can start closed.
  // Using an object map for O(1) lookups: { [title]: boolean }
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    menuData.forEach((group) => {
      initial[group.title] = false;
    });
    return initial;
  });

  const toggleGroup = useCallback((title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  return (
    <aside className="h-full w-[250px] min-w-[250px] border-r border-gray-300 bg-[#f6f6f6]">
      {/* Sidebar Header */}
      <div className="flex h-[50px] items-center border-b border-gray-300 bg-[#ececec] px-5">
        <ComputerDesktopIcon className="mr-2 size-6 text-gray-700" />
        <span className="text-lg font-bold">Home</span>
      </div>

      {/* Sidebar Menu Groups */}
      <nav className="p-5">
        <ul className="space-y-6">
          {menuData.map((group) => (
            <SidebarGroup key={group.title} group={group} isOpen={!!openGroups[group.title]} onToggle={toggleGroup} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
