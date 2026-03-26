export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Products" value="--" />
        <StatCard title="Users" value="--" />
        <StatCard title="Contacts" value="--" />
        <StatCard title="Revenue" value="₹ --" />
      </div>
    </div>
  )
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  )
}