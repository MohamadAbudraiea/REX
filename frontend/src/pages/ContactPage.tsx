import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  MessageSquare,
  User,
} from "lucide-react";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      titleKey: "contact.info.phone.title",
      contentKey: "contact.info.phone.content",
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: Mail,
      titleKey: "contact.info.email.title",
      contentKey: "contact.info.email.content",
      color: "bg-red-500/10",
      iconColor: "text-red-500",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6"
            >
              <MessageSquare className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {t("contact.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("contact.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {t("contact.info.title")}
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t("contact.info.description")}
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors duration-300"
                    >
                      <div
                        className={`p-3 rounded-full ${info.color} mr-4 flex-shrink-0`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${info.iconColor}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {t(info.titleKey)}
                        </h3>
                        <p className="text-muted-foreground">
                          {t(info.contentKey)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-6 bg-primary/5 rounded-lg border-l-4 border-primary"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {t("contact.response.title")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("contact.response.message")}
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="shadow-lg border-0 overflow-hidden rounded-lg bg-muted/50 py-0">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground rounded-t-lg ">
                  <h2 className="text-2xl font-bold flex items-center">
                    <Send className="h-5 w-5 mr-2" />
                    {t("contact.form.title")}
                  </h2>
                </div>

                <CardContent className="p-6">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="relative">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {t("contact.form.success.title")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("contact.form.success.message")}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-foreground flex items-center"
                          >
                            <User className="h-4 w-4 mr-1" />
                            {t("contact.form.name")}
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder={t("contact.form.name_placeholder")}
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-foreground flex items-center"
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            {t("contact.form.email")}
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("contact.form.email_placeholder")}
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-foreground">
                          {t("contact.form.subject")}
                        </Label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder={t("contact.form.subject_placeholder")}
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          {t("contact.form.message")}
                        </Label>
                        <Textarea
                          id="message"
                          placeholder={t("contact.form.message_placeholder")}
                          rows={5}
                          required
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200"
                          size="lg"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {t("contact.form.submit")}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("contact.faq.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.faq.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-muted/70 overflow-hidden group">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {t(`contact.faq.q${item}.question`)}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t(`contact.faq.q${item}.answer`)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
