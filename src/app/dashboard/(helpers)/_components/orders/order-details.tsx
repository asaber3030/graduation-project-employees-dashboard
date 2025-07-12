import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FullOrder } from "@/types"
import { CalendarDays, Package, User, Hash, DollarSign } from "lucide-react"

type Props = {
  order: FullOrder
}

export const AdminOrderDetails = ({ order }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "shipped":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(date))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount)
  }

  return (
    <div className='max-w-4xl space-y-6'>
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <CardTitle className='text-2xl font-bold'>Order Details</CardTitle>
              <div className='flex items-center gap-2 mt-2'>
                <Hash className='h-4 w-4 text-muted-foreground' />
                <span className='text-lg font-mono'>{order.orderNumber}</span>
              </div>
            </div>
            <Badge className={`${getStatusColor(order.status)} capitalize px-3 py-1`}>{order.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <CalendarDays className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Order Date</p>
                <p className='font-medium'>{formatDate(order.createdAt)}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <DollarSign className='h-5 w-5 text-green-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Total Amount</p>
                <p className='font-bold text-lg'>{formatCurrency(order.totalAmount)}</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <Package className='h-5 w-5 text-purple-600' />
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Items Count</p>
                <p className='font-medium'>{order.items.length} items</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div>
              <p className='text-sm text-muted-foreground'>Name</p>
              <p className='font-medium'>{order.patient.name}</p>
            </div>
            {order.patient.email && (
              <div>
                <p className='text-sm text-muted-foreground'>Email</p>
                <p className='font-medium'>{order.patient.email}</p>
              </div>
            )}
            {order.patient.phoneNumber && (
              <div>
                <p className='text-sm text-muted-foreground'>Phone</p>
                <p className='font-medium'>{order.patient.phoneNumber}</p>
              </div>
            )}
            <div>
              <p className='text-sm text-muted-foreground'>Patient ID</p>
              <p className='font-mono text-sm'>{order.patient.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {order.items.map((item, index) => (
              <div key={item.id}>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <div className='flex-shrink-0'>
                    <img src={item.product.image || "/placeholder.svg?height=80&width=80"} alt={item.product.name} width={80} height={80} className='rounded-lg object-cover border' />
                  </div>
                  <div className='flex-1 space-y-2'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'>
                      <div>
                        <h4 className='font-semibold text-lg'>{item.product.name}</h4>
                        {item.product.description && <p className='text-sm text-muted-foreground line-clamp-2'>{item.product.description}</p>}
                      </div>
                      <div className='text-right'>
                        <p className='font-bold text-lg'>{formatCurrency(item.price)}</p>
                        <p className='text-sm text-muted-foreground'>Total</p>
                      </div>
                    </div>
                    <div className='flex flex-wrap gap-4 text-sm'>
                      <div className='flex items-center gap-1'>
                        <span className='text-muted-foreground'>Quantity:</span>
                        <span className='font-medium'>{item.quantity}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <span className='text-muted-foreground'>Unit Price:</span>
                        <span className='font-medium'>{formatCurrency(item.unitPrice)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <span className='text-muted-foreground'>Product ID:</span>
                        <span className='font-mono text-xs'>{item.product.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {index < order.items.length - 1 && <Separator className='mt-4' />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span>{formatCurrency(order.items.reduce((sum, item) => sum + item.price, 0))}</span>
            </div>
            <Separator />
            <div className='flex justify-between items-center font-bold text-lg'>
              <span>Total</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
          <div className='mt-6 pt-4 border-t'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground'>
              <div>
                <p>Order Created: {formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p>Last Updated: {formatDate(order.updatedAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
