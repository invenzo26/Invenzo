export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl mb-4">Add Product</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input className="admin-input" placeholder="Product name"/>
          <input className="admin-input" placeholder="Price"/>
          <textarea className="admin-input md:col-span-2" rows={4} placeholder="Description"/>
          <button className="admin-btn md:col-span-2">Add Product</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i=>(
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl">
            <h3 className="font-semibold">Product {i}</h3>
            <p className="text-slate-400 text-sm mt-2">Sample description</p>
            <button className="delete-btn mt-4">Delete</button>
          </div>
        ))}
      </div>

    </div>
  )
}