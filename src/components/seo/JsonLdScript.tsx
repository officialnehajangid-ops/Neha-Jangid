type JsonLdScriptProps = {
  /** One or more schema.org graphs, each emitted as its own script tag. */
  schemas: readonly Record<string, unknown>[];
};

/**
 * Emits structured data for search engines. The payload is always built by
 * `src/lib/structured-data.ts` from site content, never from user input, and
 * `<` is escaped so a stray angle bracket in copy cannot close the script early.
 */
export function JsonLdScript({ schemas }: JsonLdScriptProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
