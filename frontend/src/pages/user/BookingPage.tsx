import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Car,
  MapPin,
  Navigation,
  Copy,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useAddTicket } from "@/hooks/useUser";

export default function BookPage() {
  const { addTicketMutation, isAddingTicket } = useAddTicket();
  const { t, i18n } = useTranslation();
  const [isLocating, setIsLocating] = useState(false);
  const [googleMapsLink, setGoogleMapsLink] = useState("");

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const bookingSchema = z.object({
    service: z.string().min(1, t("errors.service_required")),
    location: z.string().min(5, t("errors.address_required")),
    note: z.string().optional(),
    date: z.date().optional(),
  });

  type BookingFormData = z.infer<typeof bookingSchema>;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: "",
      location: "",
      note: "",
      date: undefined,
    },
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(t("errors.geolocation_not_supported"));
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Generate Google Maps link
          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

          setValue("location", mapsLink, { shouldValidate: true });
          setGoogleMapsLink(mapsLink);
        } catch (error) {
          console.error("Geolocation error:", error);
          toast.error(t("errors.location_error"));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error(t("errors.location_permission_denied"));
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error(t("errors.location_unavailable"));
            break;
          case error.TIMEOUT:
            toast.error(t("errors.location_timeout"));
            break;
          default:
            toast.error(t("errors.location_unknown"));
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const copyToClipboard = () => {
    if (googleMapsLink) {
      navigator.clipboard
        .writeText(googleMapsLink)
        .then(() => {
          toast.success(t("book.form.link_copied"));
        })
        .catch((err) => {
          console.error("Error copying to clipboard:", err);
          toast.error(t("book.form.link_copy_error"));
        });
    }
  };

  const onSubmit = (data: BookingFormData) => {
    addTicketMutation({
      service: data.service,
      location: data.location,
      note: data.note ?? undefined,
      date: data.date ?? undefined,
    });

    setValue("service", "");
    setValue("location", "");
    setValue("note", "");
    setValue("date", undefined);
    setGoogleMapsLink("");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {t("book.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              {t("book.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-muted/70 rounded-lg shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Car className="w-6 h-6 text-primary" />
                  {t("book.form.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service">{t("book.form.service")}</Label>
                    <Controller
                      control={control}
                      name="service"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t("book.form.service_placeholder")}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wash">
                              {t("book.form.options.wash")}
                            </SelectItem>
                            <SelectItem value="dryclean">
                              {t("book.form.options.dryclean")}
                            </SelectItem>
                            <SelectItem value="polish">
                              {t("book.form.options.polish")}
                            </SelectItem>
                            <SelectItem value="nanoceramic">
                              {t("book.form.options.nano")}
                            </SelectItem>
                            <SelectItem value="gravin">
                              {t("book.form.options.graphene")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.service && (
                      <p className="text-sm text-destructive">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  {/* location */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="location"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="w-4 h-4" />
                        {t("book.form.address")}
                      </Label>
                      {googleMapsLink && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs text-muted-foreground flex items-center gap-1"
                          onClick={copyToClipboard}
                        >
                          <Copy className="w-3 h-3" />
                          {t("book.form.copy_link")}
                        </Button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="location"
                        placeholder={t("book.form.address_placeholder")}
                        {...register("location")}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={`absolute top-1 ${
                          dir === "ltr" ? "right-2" : "left-2"
                        } h-7 w-7`}
                        onClick={getCurrentLocation}
                        disabled={isLocating}
                      >
                        <Navigation
                          className={`h-4 w-4 ${
                            isLocating ? "animate-spin" : ""
                          }`}
                        />
                      </Button>
                    </div>
                    {errors.location && (
                      <p className="text-sm text-destructive">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <Label htmlFor="date">
                      {t("book.form.preferred_date")}
                    </Label>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "PPP")
                                : t("book.form.date_placeholder")}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {errors.date && (
                      <p className="text-sm text-destructive">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="note">{t("book.form.notes")}</Label>
                    <Textarea
                      id="note"
                      placeholder={t("book.form.notes_placeholder")}
                      rows={3}
                      {...register("note")}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isAddingTicket}
                  >
                    {isAddingTicket
                      ? t("book.form.submitting")
                      : t("book.form.submit")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
}
