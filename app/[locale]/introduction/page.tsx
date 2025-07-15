import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/src/i18n/routing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudinaryGallery } from "@/components/ui/cloudinary-gallery";
import Image from "next/image";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Introduction({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering for this locale
  setRequestLocale(locale);

  const t = await getTranslations("Content.module1");

  const listItems = t.raw("section1.descriptionList.list") as Array<{
    id: number;
    description: string;
  }>;

  const imageList = t.raw("section2.imageList") as Array<{
    url: string;
    alt: string;
  }>;

  const projectImageList = t.raw("section3.imageList") as Array<{
    url: string;
    alt: string;
  }>;

  return (
    <div className="flex flex-1 flex-col gap-4 bg-muted/50">
      <Card className="h-full m-4">
        <CardHeader>
          <CardTitle>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
              {t("section1.title")}
            </h1>
          </CardTitle>
          <CardDescription>{t("section1.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p>{t("section1.descriptionList.title")}</p>
            <ul className="mt-2 ml-4 space-y-1">
              {listItems.map((item) => (
                <li key={item.id} className="list-disc">
                  {item.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("section2.title")}
              </h3>
              {t("section2.description")}
              <CloudinaryGallery
                images={imageList}
                className="mt-4"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("section3.title")}
              </h3>
              {t("section3.description")}
              <CloudinaryGallery
                images={projectImageList}
                className="mt-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
