import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  CheckCircle,
  Car,
  MapPin,
  Navigation,
  Copy,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BookPage() {
  const { t, i18n } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [googleMapsLink, setGoogleMapsLink] = useState("");

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const bookingSchema = z.object({
    service: z.string().min(1, t("errors.service_required")),
    address: z.string().min(5, t("errors.address_required")),
    note: z.string().optional(),
    preferredDate: z.date().optional(),
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
      address: "",
      note: "",
      preferredDate: undefined,
    },
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t("errors.geolocation_not_supported"));
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Generate Google Maps link
          const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

          setValue("address", mapsLink, { shouldValidate: true });
          setGoogleMapsLink(mapsLink);
        } catch (error) {
          console.error("Geolocation error:", error);
          alert(t("errors.location_error"));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        console.error("Geolocation error:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(t("errors.location_permission_denied"));
            break;
          case error.POSITION_UNAVAILABLE:
            alert(t("errors.location_unavailable"));
            break;
          case error.TIMEOUT:
            alert(t("errors.location_timeout"));
            break;
          default:
            alert(t("errors.location_unknown"));
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const copyToClipboard = () => {
    if (googleMapsLink) {
      navigator.clipboard
        .writeText(googleMapsLink)
        .then(() => {
          alert(t("book.form.link_copied"));
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Booking submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                {t("book.success.title")}
              </CardTitle>
              <CardDescription className="text-base">
                {t("book.success.message")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-sm text-muted-foreground">
                  {t("book.success.status")}
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/">{t("book.success.back")}</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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
                            <SelectItem value="nano">
                              {t("book.form.options.nano")}
                            </SelectItem>
                            <SelectItem value="graphene">
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

                  {/* Address */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="address"
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
                        id="address"
                        placeholder={t("book.form.address_placeholder")}
                        {...register("address")}
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
                    {errors.address && (
                      <p className="text-sm text-destructive">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">
                      {t("book.form.preferred_date")}
                    </Label>
                    <Controller
                      control={control}
                      name="preferredDate"
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
                    {errors.preferredDate && (
                      <p className="text-sm text-destructive">
                        {errors.preferredDate.message}
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting
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
