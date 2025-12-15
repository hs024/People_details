export default function UserDetailsCard({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-full sm:w-100 bg-white h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <Detail label="Name" value={user.name} />
          <Detail label="Username" value={user.username} />
          <Detail label="Email" value={user.email} />
          <Detail label="Phone" value={user.phone} />

          <Detail
            label="Website"
            value={
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.website}
              </a>
            }
          />

          <hr />

          <h3 className="font-semibold">Address</h3>
          <Detail label="City" value={user.address?.city} />
          <Detail label="Street" value={user.address?.street} />
          <Detail label="Zip" value={user.address?.zipcode} />

          <hr />

          <h3 className="font-semibold">Company</h3>
          <Detail label="Name" value={user.company?.name} />
          <Detail label="Catch Phrase" value={user.company?.catchPhrase} />
          <Detail label="Business" value={user.company?.bs} />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value || "-"}</span>
    </div>
  );
}
