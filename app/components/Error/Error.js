import notFoundPoster from '~/assets/notfound.jpg';
import notFoundVideo from '~/assets/notfound.mp4';
import { Button } from '~/components/Button';
import { DecoderText } from '~/components/DecoderText';
import { Heading } from '~/components/Heading';
import { Text } from '~/components/Text';
import { Transition } from '~/components/Transition';
import { Fragment } from 'react';
import styles from './Error.module.css';

export function Error({ error }) {
  const flatlined = !error.status;

  const getMessage = () => {
    switch (error.status) {
      case 404:
        return {
          summary: 'Error: redacted',
          message:
            'This page could not be found. It either doesn’t exist or was deleted. Or perhaps you don’t exist.',
        };
      default:
        return {
          summary: 'Error: anomaly',
          message: error.data || error.toString(),
        };
    }
  };

  const { summary, message } = getMessage();

  return (
    <section className={styles.page}>
      {flatlined && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
            [data-theme='dark'] {
              --rgbPrimary: 255 94 89;
              --rgbAccent: 255 94 89;
            }
            [data-theme='light'] {
              --rgbPrimary: 255 94 89;
              --rgbAccent: 255 94 89;
            }
          `,
          }}
        />
      )}
      <Transition in>
        {visible => (
          <Fragment>
            <div className={styles.details}>
              <div className={styles.text}>
                {!flatlined && (
                  <Heading
                    className={styles.title}
                    data-visible={visible}
                    level={0}
                    weight="bold"
                  >
                    {error.status}
                  </Heading>
                )}
                {flatlined && (
                  <Heading
                    className={styles.titleFlatline}
                    data-visible={visible}
                    level={2}
                    as="h1"
                  >
                    <svg width="73" height="98" viewBox="0 0 73 98">
                      <path
                        fillRule="evenodd"
                        d="M.227 24.258c0-.54.183-1.304.46-2.128a23 23 0 0 1 1.345-3.124c1.222-2.378 3.14-5.28 5.94-8.097C13.529 5.32 22.514.121 36.258.002V0a55.898 55.898 0 0 1 .482 0v.002c13.745.12 22.73 5.317 28.287 10.907 2.8 2.816 4.718 5.72 5.94 8.097a22.983 22.983 0 0 1 1.345 3.124c.277.824.46 1.588.46 2.128 0 .642.032 1.826.073 3.302v.006c.04 1.436.086 3.146.118 4.903.063 3.46.07 7.175-.209 8.85-.121.73-.45 1.81-.858 2.996a109.734 109.734 0 0 1-1.503 4.051 287.51 287.51 0 0 1-3.022 7.394l.987 4.784 2.355 3.767c.177.284.271.613.271.948v8.046a1.79 1.79 0 0 1-.616 1.351l-3.587 3.108a1.788 1.788 0 0 1-.529.318l-9.496 3.652-4.1 6.15.63 4.417a1.787 1.787 0 0 1-1.362 1.993l-14.239 3.322c-.42.098-.833.04-1.186-.132-.353.172-.766.23-1.186.132l-14.238-3.322a1.787 1.787 0 0 1-1.364-1.993l.631-4.416-4.1-6.151-9.496-3.652a1.788 1.788 0 0 1-.53-.318L2.63 74.656a1.787 1.787 0 0 1-.616-1.35v-8.047c0-.335.094-.664.271-.948l2.355-3.767.987-4.784a287.624 287.624 0 0 1-3.022-7.394 109.971 109.971 0 0 1-1.503-4.051C.696 43.129.366 42.05.245 41.32c-.28-1.676-.272-5.392-.21-8.85.033-1.759.08-3.471.12-4.907v-.002c.04-1.476.072-2.66.072-3.303Zm6.316 27.066 1.344-6.514v-7.373L4.81 33.176l2.07-1.495 3.222 4.462c.22.305.339.671.339 1.047v7.698c0 .121-.013.242-.037.361l-3.29 15.946a1.788 1.788 0 0 1-.235.586l-2.311 3.697v7.478l3.22 2.79 3.638 1.4 1.073-4.471c.108-.45.386-.84.775-1.089l3.413-2.184-1.266-.095a6.383 6.383 0 0 1-3.376-1.276l-.118-.09a6.384 6.384 0 0 1-2.481-4.298l-.6-4.795a6.384 6.384 0 0 1 .349-3.009l.7-1.89a6.383 6.383 0 0 1 5.498-4.149l8.36-.641a6.383 6.383 0 0 1 3.89.962l2.48 1.562a6.383 6.383 0 0 1 2.854 6.673l-.744 3.664a6.384 6.384 0 0 1-2.268 3.714l-3.37 2.695a6.383 6.383 0 0 1-4.464 1.38l-1.303-.097.032.05-5.95 3.808-1.08 4.5 3.557 1.368c.345.133.64.37.845.677l4.22 6.33 12.502 2.902v-5.084h-1.296a1.787 1.787 0 0 1-1.364-.633l-2.45-2.895a1.787 1.787 0 0 1-.271-1.874l4.51-10.253c.463-1.05 1.583-1.282 2.417-.891.834-.39 1.954-.16 2.416.891l4.511 10.252a1.79 1.79 0 0 1-.271 1.875l-2.45 2.895a1.79 1.79 0 0 1-1.364.633h-1.296v4.881l12.545-2.764 4.177-6.265c.205-.308.5-.544.845-.677l6.154-2.366-1.094-3.83-4.545-3.827-5.258.395a6.383 6.383 0 0 1-4.466-1.381l-3.088-2.47a6.383 6.383 0 0 1-2.376-4.483l-.376-4.765a6.383 6.383 0 0 1 2.43-5.53l2.198-1.72a6.384 6.384 0 0 1 4.295-1.346l8.958.507a6.384 6.384 0 0 1 5.067 3.014l.603.973-1.519-7.36a1.783 1.783 0 0 1-.037-.361V37.19c0-.376.119-.742.339-1.047l3.222-4.462 2.07 1.495-3.078 4.261v7.373l1.345 6.514c.504-1.23 1.045-2.571 1.558-3.886a107.375 107.375 0 0 0 1.467-3.953c.41-1.194.672-2.09.755-2.585.231-1.388.239-4.822.174-8.384-.03-1.68-.076-3.372-.116-4.816v-.005a166.493 166.493 0 0 1-.076-3.438l-.001-.03a3.67 3.67 0 0 0-.063-.371 9.303 9.303 0 0 0-.263-.912 20.443 20.443 0 0 0-1.195-2.77c-1.116-2.171-2.885-4.854-5.48-7.464C58.084 7.544 49.668 2.613 36.5 2.554c-13.166.06-21.583 4.99-26.718 10.156-2.594 2.61-4.363 5.293-5.479 7.463a20.444 20.444 0 0 0-1.195 2.77 9.28 9.28 0 0 0-.262.913 3.673 3.673 0 0 0-.064.371.453.453 0 0 0-.001.03c0 .66-.034 1.91-.076 3.438v.001a534.68 534.68 0 0 0-.116 4.82c-.065 3.562-.057 6.996.174 8.384.083.496.345 1.392.755 2.585.4 1.166.916 2.54 1.467 3.953a240.983 240.983 0 0 0 1.558 3.886Zm52.932 17.572 3.021 2.544c.272.23.47.534.567.876l1.096 3.835 1.052-.404 3.221-2.791v-7.478l-2.31-3.697a1.785 1.785 0 0 1-.236-.586l-.578-2.802-.466 4.308a6.383 6.383 0 0 1-2.665 4.529l-1.302.92a6.382 6.382 0 0 1-1.4.746Zm-9.228 20.175-1.903.42.542 2.89 1.775-.414-.414-2.896Zm-3.4.749-1.863.41.682 2.902 1.726-.402-.545-2.91Zm-3.36.74-2.103.464.337 3.029 2.454-.573-.688-2.92Zm-3.608.795-1.833.404v3.151l2.172-.506-.339-3.049Zm-4.925.614-1.577-.366-.319 2.865 1.896.442v-2.94Zm-3.08-.715-2.394-.556-.654 2.782 2.73.638.318-2.864Zm-3.886-.902-1.854-.43-.526 2.808 1.726.402.654-2.78Zm-3.348-.778-1.896-.44-.405 2.833 1.775.414.526-2.806Zm13.406-7.865h.94l1.911-2.258-2.85-6.48v8.738Zm8.72-30.237a3.83 3.83 0 0 1 2.577-.808l8.958.508a3.83 3.83 0 0 1 3.04 1.808l.996 1.61a3.83 3.83 0 0 1 .551 2.427l-.584 5.41a3.83 3.83 0 0 1-1.6 2.717l-1.302.92a3.83 3.83 0 0 1-1.922.69l-6.801.51a3.83 3.83 0 0 1-2.68-.829l-3.088-2.47a3.83 3.83 0 0 1-1.425-2.69l-.376-4.765a3.83 3.83 0 0 1 1.457-3.317l2.199-1.72Zm1.571 20.659a2.071 2.071 0 1 1 3.181 2.649l-.8.89a2.025 2.025 0 0 1-3.11-2.59l.729-.95Zm1.997.857a.54.54 0 0 0-.783.077l-.73.949a.493.493 0 0 0 .758.63l.8-.89a.54.54 0 0 0-.045-.766ZM37.791 54.643v9.959h-2.553v-9.959h2.553Zm8.253-16.962 5.186 2.717 8.487 1.497-.444 2.515-8.604-1.518a1.785 1.785 0 0 1-.518-.177l-5.292-2.772 1.185-2.262Zm-9.284 6.5 4.34-3.32 1.552 2.03-4.34 3.319-1.552-2.029Zm-12.097 27.95a2.071 2.071 0 1 0-3.182 2.649l.801.89a2.025 2.025 0 0 0 3.11-2.59l-.729-.95Zm-1.997.857a.54.54 0 0 1 .783.077l.73.949a.493.493 0 0 1-.758.63l-.8-.89a.54.54 0 0 1 .045-.766Zm3.617-20.706a3.831 3.831 0 0 0-2.334-.577l-8.361.641a3.83 3.83 0 0 0-3.299 2.489l-.7 1.89a3.83 3.83 0 0 0-.209 1.806l.6 4.796a3.83 3.83 0 0 0 1.488 2.578l.118.09a3.83 3.83 0 0 0 2.026.765l6.71.504A3.83 3.83 0 0 0 25 66.435l3.369-2.695a3.83 3.83 0 0 0 1.36-2.228l.745-3.665a3.83 3.83 0 0 0-1.713-4.004l-2.48-1.56Zm8.67 29.427h-.94l-1.91-2.258 2.85-6.48v8.738ZM21.92 42.404a1.787 1.787 0 0 0-.436 0l-8.137 1.014.316 2.534 8.043-1.002 8.271 1.002.307-2.535-8.364-1.013Zm45.49-15.338h-2.553V21.45h2.554v5.617ZM14.779 37.761 11.97 25.504l-2.489.57 2.809 12.257 2.489-.57Z"
                      />
                    </svg>
                    <DecoderText text="Flatlined" start={visible} delay={0} />
                  </Heading>
                )}
                {!flatlined && (
                  <Heading
                    aria-hidden
                    className={styles.subheading}
                    data-visible={visible}
                    as="h2"
                    level={3}
                  >
                    <DecoderText text={summary} start={visible} delay={300} />
                  </Heading>
                )}
                <Text className={styles.description} data-visible={visible} as="p">
                  {message}
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevron-right"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                data-visible={visible}
                poster={notFoundPoster}
              >
                <source src={notFoundVideo} type="video/mp4" />
              </video>
              <a
                className={styles.credit}
                data-visible={visible}
                href="https://www.imdb.com/title/tt0113568/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation from Ghost in the Shell (1995)
              </a>
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}
