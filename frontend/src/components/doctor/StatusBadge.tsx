import type { AppointmentStatus } from "../../types";

interface StatusBadgeProps {
    status: AppointmentStatus;
}

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "Visited"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
        >
            {status}
        </span>
    );
}