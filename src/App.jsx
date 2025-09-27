import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/CartContext"

function App() {
  return (
    <CartProvider>
      <Pages />
      <Toaster />
    </CartProvider>
  )
}

export default App 