import { listCars } from "@/http/apis/car/list-cars";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { auth } from "@/auth/auth";
import Image from "next/image";

export default async function page({ searchParams }: Page) {
  const { from, to } = await searchParams;
  const cars = await listCars({
    from: from ? new Date(String(from)) : new Date(),
    to: to ? new Date(String(to)) : new Date(),
  });

  const { user } = await auth();

  return (
    <div className="flex flex-col gap-4">
      <Form className="flex w-full md:w-96 gap-4" action="/cars">
        <div className="flex flex-col gap-2">
          <Label htmlFor="from">From</Label>
          <Input name="from" placeholder="Search" type="date" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="to">To</Label>
          <Input name="to" placeholder="Search" type="date" />
        </div>
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </Form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.data.map((car) => (
          <Card key={car.id}>
            <CardHeader>
              <CardTitle>{car.model}</CardTitle>
              <CardDescription>{car.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-40 justify-center items-center flex">
                <Image src={car.image ?? ""} alt="" width={250} height={250} />
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <Label>Daily Price</Label>
                  <span>
                    {Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                    }).format(car.dailyPrice)}
                  </span>
                </div>
                <div>
                  <Label>Booking Price</Label>
                  <span>
                    {Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "USD",
                    }).format(car.bookingPrice)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <ConfirmationDialog carId={car.id} userId={user.id}>
                <Button className="ml-auto cursor-pointer" type="button">
                  Book
                </Button>
              </ConfirmationDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
