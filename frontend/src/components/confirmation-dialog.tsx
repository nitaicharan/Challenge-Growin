'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import { bookAction } from "@/http/actions/booking/book-action"
import { toast } from "sonner"
import { useForm } from 'react-hook-form'
import { bookingSchema, type BookCar } from '@/http/models/booking.model'
import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { z } from 'zod'

type ConfirmationDialogProps = {
  children: React.ReactNode
  carId: string
  userId: string
}

export function ConfirmationDialog({
  children,
  carId,
  userId,
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookCar>({
    resolver: zodResolver(bookingSchema.extend({
      carId: z.string(),
      userId: z.string(),
    }).pick({
      carId: true,
      userId: true,
      startDate: true,
      endDate: true,
    })),
    defaultValues: {
      userId,
      carId,
    }
  })

  async function handleSubmitFunction(data: BookCar) {
    const req = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    }

    const res = await bookAction(req)

    if (res.ok) {
      toast.success(res.message)
      setOpen(false)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSubmitFunction)}>
          <DialogHeader>Confirmation</DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className='mt-4'>
            This is a booking confirmation.
          </DialogDescription>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className="flex flex-col gap-2">
              <Label htmlFor="from">From</Label>
              <Input {...register('startDate')} placeholder="Search" type="date" />
              {errors.startDate?.message && (
                <span className='text-xs text-red-500'>{errors.startDate.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="from">To</Label>
              <Input {...register('endDate')} placeholder="Search" type="date" />
              {errors.endDate?.message && (
                <span className='text-xs text-red-500'>{errors.endDate.message}</span>
              )}
            </div>
          </div>
          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="cursor-pointer"
                type="button"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}