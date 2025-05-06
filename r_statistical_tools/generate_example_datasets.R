library(dplyr)
library(readr)
library(tibble)

## Sample with 128 elements, 16 bit signed integers.
nullMedianSample <- runif(n=128, min=-2^15, max=2^15) %>%
  as_tibble_col(column_name = "measurements") %>%
  mutate(
    abs = abs(measurements)
  ) %>%
  arrange(abs) %>%
  transmute(
    float = measurements,
    integer = as.integer(measurements)
  )

## Being a normal distribution, we need to try some iterations before we get a sample in the range we want.
shiftedMedianSample <- rnorm(n=128, mean=1000, sd=5)

## ensure no overflow happens
while ( max(shiftedMedianSample) > 2^15 | min(shiftedMedianSample) < -2^15 ) {
  shiftedMedianSample <- rnorm(n=128, mean=1000, sd=10000)
}
shiftedMedianSample <- shiftedMedianSample %>%
  as_tibble_col(column_name = "measurements") %>%
  mutate(
    abs = abs(measurements)
  ) %>%
  arrange(abs) %>%
  transmute(
    float = measurements,
    integer = as.integer(measurements)
  )
nonRejectingTest <- wilcox.test(nullMedianSample$float)
rejectingTest <- wilcox.test(shiftedMedianSample$float)

## Los valores p se obtienen usando la función psignrank, provista junto a wilcox.test.
## Hipótesis alternativa bilateral: la posición puede ser mayor o menor que 0. Nos interesa la probabilidad de todo el intervalo de valores fuera del intervalo entre el valor observado y su simétrico, 2 * (1 - psignrank(q,n))

near(2 * (1 - psignrank(nonRejectingTest$statistic, n=128)), nonRejectingTest$p.value, tol=0.001)
near( 2 * (1 - psignrank(rejectingTest$statistic, n=128)),rejectingTest$p.value, tol=0.001 )

confinde10PercentSatistic <- qsignrank(p=0.1, n=128)

write_csv( x = nullMedianSample, "./r_statistical_tools/null_median_dataset.csv")
write_csv( x = shiftedMedianSample, "./r_statistical_tools/shifted_median_dataset.csv")
