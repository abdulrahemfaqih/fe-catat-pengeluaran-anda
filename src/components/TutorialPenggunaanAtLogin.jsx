import React from 'react'

export default function TutorialPenggunaanAtLogin() {
  return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="relative bg-white border-4 border-black p-6 rounded-xl w-full max-w-md max-h-[80vh] overflow-auto shadow-[12px_12px_0px_rgba(0,0,0,1)]">
              <div className="absolute -top-2 -left-2 rounded-full bg-blue-400 border-4 border-black h-12 w-12 flex items-center justify-center font-bold text-2xl">
                  ?
              </div>
              <h2 className="text-2xl font-bold mb-6 mt-4 text-center">
                  Cara Menggunakan Aplikasi
              </h2>

              <p className="mb-4">
                  Aplikasi ini membantu Anda mencatat pemasukan dan
                  pengeluaran harian, mengatur budget, serta menyimpan
                  riwayat pengeluaran bulanan.
              </p>

              <div className="space-y-4 mb-6">
                  <div className="p-3 border-3 border-black rounded-lg bg-blue-50">
                      <h3 className="font-bold mb-1">1. Register</h3>
                      <p>
                          Jika belum punya akun, masukkan nama, email, dan
                          password di form Register. Setelah berhasil, Anda
                          akan otomatis login.
                      </p>
                  </div>

                  <div className="p-3 border-3 border-black rounded-lg bg-green-50">
                      <h3 className="font-bold mb-1">2. Login</h3>
                      <p>
                          Jika sudah punya akun, gunakan email dan password
                          untuk masuk ke dashboard.
                      </p>
                  </div>

                  <div className="p-3 border-3 border-black rounded-lg bg-yellow-50">
                      <h3 className="font-bold mb-1">3. Dashboard</h3>
                      <p>
                          Anda bisa menambahkan transaksi harian (tanggal,
                          nama, kategori, dan nominal), mengatur budget per
                          kategori, dan memasukkan pemasukan bulanan.
                      </p>
                  </div>

                  <div className="p-3 border-3 border-black rounded-lg bg-red-50">
                      <h3 className="font-bold mb-1">4. History</h3>
                      <p>
                          Setelah selesai mengisi transaksi dalam satu bulan,
                          klik tombol "Simpan Pengeluaran Bulan Ini" agar
                          pengeluaran bulan tersebut tercatat di riwayat.
                      </p>
                  </div>

                  <div className="p-3 border-3 border-black rounded-lg bg-purple-50">
                      <h3 className="font-bold mb-1">5. Melihat Riwayat</h3>
                      <p>
                          Anda dapat membuka riwayat pengeluaran bulanan untuk
                          melihat total per kategori pada bulan sebelumnya.
                      </p>
                  </div>
              </div>

              <p className="mb-6 p-3 border-3 border-black rounded-lg bg-gray-50">
                  Pastikan Anda mengisi data dengan benar. Setelah selesai,
                  jangan lupa untuk logout agar akun Anda aman.
              </p>

              <p className="mb-6 font-medium">
                  Jika ada pertanyaan lebih lanjut, silakan hubungi admin di{" "}
                  <a
                      target="_blank"
                      href="https://abdulrahemfaqih.works"
                      className="text-blue-500 underline font-bold"
                  >
                      link ini
                  </a>{" "}
                  pada menu Contact.
              </p>

              <div className="flex justify-end">
                  <button
                      onClick={() => setShowTutorial(false)}
                      className="px-6 py-3 border-3 border-black bg-white text-black font-bold rounded-lg hover:bg-black hover:text-white transition shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                  >
                      Tutup
                  </button>
              </div>
          </div>
      </div>
  )
}
