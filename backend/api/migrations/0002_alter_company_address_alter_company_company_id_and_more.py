# Generated by Django 4.2.14 on 2024-07-26 21:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="company",
            name="address",
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="company",
            name="company_id",
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="company",
            name="latitude",
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name="company",
            name="longitude",
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name="location",
            name="address",
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="location",
            name="latitude",
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
        migrations.AlterField(
            model_name="location",
            name="location_id",
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="location",
            name="longitude",
            field=models.DecimalField(decimal_places=6, max_digits=9),
        ),
    ]
