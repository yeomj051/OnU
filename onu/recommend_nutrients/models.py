from django.db import models


# Create your models here.
class Nutrient_type(models.Model):
    nutrient_type_id = models.IntegerField(primary_key = True)
    nutrient_type = models.CharField(max_length=255)

    class Meta:
        db_table = 'nutrient_type'


class Nutrient(models.Model):
    nutrient_id = models.BigIntegerField(primary_key = True)
    nutrient_name = models.TextField()
    nutrient_image_url = models.TextField()
    nutrient_brand = models.TextField()
    nutrient_intake = models.TextField()
    nutrient_caution = models.TextField()
    nutrient_expiration = models.TextField()
    nutrient_material = models.TextField()
    nutrient_pregnant = models.BooleanField()
    nutrient_child = models.BooleanField()
    nutrient_gender = models.IntegerField()
    nutrient_type = models.ForeignKey(Nutrient_type, on_delete=models.CASCADE)

    class Meta:
        db_table = 'nutrient'

'''
    @Id
    private Long nutrientId;

    @Column
    private String nutrientName;

    @Column
    private String nutrientImageUrl;

    @Column
    private String nutrientBrand;

    @Column
    private String nutrientIntake;

    @Column
    private String nutrientCaution;

    @Column
    private String nutrientExpiration;

    @ManyToOne
    @JoinColumn(name = "nutrient_type_id")
    private NutrientType nutrientTypeId;

    @Column
    private String nutrientMaterial;

    @Column
    private boolean nutrientPregnant;

    @Column
    private boolean nutrientChild;

    @Column
    private int nutrientGender;
'''
