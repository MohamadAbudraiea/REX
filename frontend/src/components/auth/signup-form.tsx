import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function SignupForm() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Create the schema using useMemo to regenerate it when t changes
  const signupSchema = useMemo(() => {
    return z
      .object({
        name: z.string().min(2, t("validations.name.min")),
        email: z.string().email(t("validations.email")),
        phone: z.string().min(10, t("validations.phone.min")),
        password: z.string().min(6, t("validations.password.min")),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: t("validations.password.match"),
        path: ["confirmPassword"],
      });
  }, [t]);

  type SignupFormData = z.infer<typeof signupSchema>;

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  // Re-trigger validation when schema changes only if user has interacted
  useEffect(() => {
    if (hasInteracted) {
      form.trigger();
    }
  }, [signupSchema, form, hasInteracted]);

  // Track form interactions
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasInteracted(true);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Signup data:", data);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="shadow-lg border-0 bg-card">
        {/* Header */}
        <CardHeader className="space-y-6 text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex justify-center"
          >
            <img src="/logo.png" alt="REX CAR Logo" className="h-20 w-auto" />
          </motion.div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {t("signup.title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {t("signup.description")}
            </CardDescription>
          </div>
        </CardHeader>
        {/* Content */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t("signup.name")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder={t("signup.name.placeholder")}
                          className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t("signup.email")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder={t("signup.email.placeholder")}
                          className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t("signup.phone")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder={t("signup.phone.placeholder")}
                          className="pl-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t("signup.password")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("signup.password.placeholder")}
                          className="pl-10 pr-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t("signup.confirm_password")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("signup.confirm_password.placeholder")}
                          className="pl-10 pr-10 h-12 bg-input border-border focus:ring-2 focus:ring-ring"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  t("signup.create_account")
                )}
              </Button>

              {/* Link to Login */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("signup.already_have_account")}{" "}
                  <Link
                    to="/login"
                    className="text-accent hover:text-accent/80 transition-colors underline-offset-4 hover:underline font-medium"
                  >
                    {t("signup.login")}
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
