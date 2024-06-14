from prophet import Prophet
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

#df = pd.read_excel('Ingresos_2.xlsx')
#df['Fecha '] = pd.to_datetime(df['Fecha '])
#df.rename(columns={'Fecha ': 'Fecha'}, inplace=True)
#df.drop_duplicates(subset='Fecha', keep='last', inplace=True)

def fit_prophet_model(data, column, dias):
  print(column)
  if column != 'hombres':
      data[column] += np.random.normal(0, data[column].std() * 0.1, size=len(data))
      df_prophet = data.reset_index().rename(columns={'fecha': 'ds', column: 'y'})

      cap_value = df_prophet['y'].max() * 1.5
      df_prophet['cap'] = cap_value

      model = Prophet(
          growth="logistic",
          seasonality_mode='multiplicative',
          changepoint_prior_scale=0.5,
          interval_width=0.95
      )
      model.fit(df_prophet)
      future = model.make_future_dataframe(periods=dias)
      future['cap'] = df_prophet['cap'].iloc[0]
      forecast = model.predict(future)
  elif column == 'hombres':
      data[column] += np.random.normal(0, data[column].std() * 0.1, size=len(data))
      df_prophet = data.reset_index().rename(columns={'fecha': 'ds', column: 'y'})

      model = Prophet(
          growth="linear")
      model.fit(df_prophet)
      future = model.make_future_dataframe(periods=dias)
      forecast = model.predict(future)

  forecast = forecast[['ds', 'yhat']]
  return model, forecast

def create_models(df, dias):
  forecasts = {}
  # Entrenar un modelo para cada columna
  for column in df.columns[1:-1]:
      model, forecast = fit_prophet_model(df, column, dias)
      forecasts[column] = forecast

  total_forecast = pd.DataFrame({'ds': forecasts[list(forecasts.keys())[0]]['ds']})
  total_forecast['yhat'] = sum(forecast['yhat'].round().astype(int) for forecast in forecasts.values())
  forecasts['total'] = total_forecast

  #for column in df.columns[1:]:
  #  forecast = forecasts[column]
  return forecasts

df = pd.read_excel('ingresos.xlsx') ########## aca seria el fetch decrypt
df.columns = ['fecha', 'hombres', 'mujeres', 'niños', 'niñas', 'lgbtqi', 'total']
forecasts = create_models(df, 5)

# Ingresos y Predicciones juntos
colors = {
    'hombres': 'blue',
    'mujeres': 'hotpink',
    'niños': 'deepskyblue',
    'niñas': 'deeppink',
    'lgbtqi': 'red',
    'total': 'orange'
}

# Create a figure
fig = go.Figure()

# Graficar las predicciones
#plt.figure(figsize=(16, 8), dpi=150)
for column in df.columns[1:]:
    forecast = forecasts[column]
    # Graficar predicciones con línea punteada
    fig.add_trace(go.Scatter(x = forecast['ds'], y = forecast['yhat'].round().astype(int), mode='lines', name=f'Predicción {column}', line=dict(dash='dot', color=colors[column])))
    # Graficar valores reales con línea sólida
    fig.add_trace(go.Scatter(x = df['fecha'], y = df[column].round().astype(int), mode='lines', name=f'Real {column}', line=dict(dash='solid', color = colors[column])))

# Add vertical line
fig.add_shape(
    type='line',
    x0=df['fecha'].iloc[-1],
    y0=0,
    x1=df['fecha'].iloc[-1],
    y1=1,
    xref='x',
    yref='paper',
    line=dict(color='black', dash='dash'),
    name='Inicio de la predicción'
)

# Agregar una línea vertical invisible para la leyenda
fig.add_trace(go.Scatter(
    x=[df['fecha'].iloc[-1], df['fecha'].iloc[-1]],
    y=[0, 1],
    mode='lines',
    line=dict(color='black', dash='dash'),
    name='Inicio de la predicción'
))

fig.update_layout(
    title='Evolución de ingresos',
    xaxis_title='Días',
    yaxis_title='Ingresos',
    legend_title='Leyenda'
)

# Agregar características interactivas
fig.update_traces(mode='lines')

# Guardar como archivo HTML
fig.write_html("evolucion_ingresos.html")

fig.show()