"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createSetting } from "@/components/actions/settings/getSettings";
import { useRouter } from "next/navigation";

export default function AddSetting() {
  const { t } = useTranslation();
  const [slug, setSlug] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!slug || !value) {
      setError(t("settings:form.error"));
      return;
    }

    const data = {
      slug,
      value,
    };

    const response = await createSetting(data);
    if (response) {
      setError("Added");
      router.push(`/dashboard/settings/${slug}`);
    } else {
      setError(t("settings:form.error"));
    }
  }

  return (
    <div className="container">
      <h1>{t("settings:settings.settings")}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="slug">{t("settings:form.slug")}</label>
          <input
            type="text"
            className="form-control"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">{t("settings:form.value")}</label>
          <input
            type="text"
            className="form-control"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {t("settings:form.submit")}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}
