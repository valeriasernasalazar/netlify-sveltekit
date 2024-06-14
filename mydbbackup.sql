PGDMP              	        |            postgres    14.12 (Homebrew)    16.1     <           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            =           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            >           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    14088    postgres    DATABASE     j   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE postgres;
                valeriaserna    false            @           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   valeriaserna    false    3647                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                valeriaserna    false            A           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   valeriaserna    false    4            �            1259    16406 	   migrantes    TABLE     +  CREATE TABLE public.migrantes (
    id bytea,
    abusoderechos bytea,
    abusomexico bytea,
    accesomonarca bytea,
    acompanante bytea,
    agresionautoridades bytea,
    como_viajo bytea,
    contactoemergencia bytea,
    cualenfermedad bytea,
    cuantopago bytea,
    curp bytea,
    denunciaformal bytea,
    dep_est bytea,
    descripcionhechos bytea,
    descripcionred bytea,
    destinofinal bytea,
    destinomonterrey bytea,
    documentoidentidad bytea,
    edad bytea,
    estacionmigratoria bytea,
    estadocivil bytea,
    estadoestacion bytea,
    fechaatencion bytea,
    fechaingresomexico bytea,
    fechanacimiento bytea,
    fechasalidapais bytea,
    fotofrente bytea,
    fotoperfilderecho bytea,
    fotoperfilizquierdo bytea,
    grado_ac bytea,
    idiomas bytea,
    intentoeeuu bytea,
    lugaringreso bytea,
    nombrecompleto bytea,
    numhijos bytea,
    observacionesfinales bytea,
    otroalbergue bytea,
    otroidioma bytea,
    padecealergia bytea,
    padeceenfermedad bytea,
    pagoguia bytea,
    paisorigen bytea,
    puederegresar bytea,
    quienabuso bytea,
    razonmonterrey bytea,
    razonnoacceso bytea,
    razonnodenuncia bytea,
    razonnoregreso bytea,
    razonsalida bytea,
    redapoyoeeuu bytea,
    redapoyomonterrey bytea,
    sabeleerescribir bytea,
    senasparticulares bytea,
    serviciosbrindados bytea,
    sexo bytea,
    solucionbrindada bytea,
    telefono bytea,
    tiempored bytea,
    tienehijos bytea,
    tipo bytea,
    tipoabuso bytea,
    tipoabusomexico bytea,
    tipoalergia bytea,
    tipodocmigratorio bytea,
    tipopoblacion bytea,
    tratamientomedico bytea,
    ubicacioncontactoemergencia bytea,
    ultimoalbergue bytea,
    ultimogrado bytea,
    viajando bytea,
    activo_cm bytea,
    ultimafecha bytea,
    estado_migracion bytea
);
    DROP TABLE public.migrantes;
       public         heap    postgres    false    4            �            1259    16510 	   servicios    TABLE     �   CREATE TABLE public.servicios (
    id bytea,
    edad bytea,
    nombrecompleto bytea,
    paisorigen bytea,
    sexo bytea,
    activo_cm bytea,
    estado_migracion bytea,
    servicios bytea,
    usuario bytea,
    fecharec bytea,
    area bytea
);
    DROP TABLE public.servicios;
       public         heap    postgres    false    4            8          0    16406 	   migrantes 
   TABLE DATA           R  COPY public.migrantes (id, abusoderechos, abusomexico, accesomonarca, acompanante, agresionautoridades, como_viajo, contactoemergencia, cualenfermedad, cuantopago, curp, denunciaformal, dep_est, descripcionhechos, descripcionred, destinofinal, destinomonterrey, documentoidentidad, edad, estacionmigratoria, estadocivil, estadoestacion, fechaatencion, fechaingresomexico, fechanacimiento, fechasalidapais, fotofrente, fotoperfilderecho, fotoperfilizquierdo, grado_ac, idiomas, intentoeeuu, lugaringreso, nombrecompleto, numhijos, observacionesfinales, otroalbergue, otroidioma, padecealergia, padeceenfermedad, pagoguia, paisorigen, puederegresar, quienabuso, razonmonterrey, razonnoacceso, razonnodenuncia, razonnoregreso, razonsalida, redapoyoeeuu, redapoyomonterrey, sabeleerescribir, senasparticulares, serviciosbrindados, sexo, solucionbrindada, telefono, tiempored, tienehijos, tipo, tipoabuso, tipoabusomexico, tipoalergia, tipodocmigratorio, tipopoblacion, tratamientomedico, ubicacioncontactoemergencia, ultimoalbergue, ultimogrado, viajando, activo_cm, ultimafecha, estado_migracion) FROM stdin;
    public          postgres    false    209   B       9          0    16510 	   servicios 
   TABLE DATA           �   COPY public.servicios (id, edad, nombrecompleto, paisorigen, sexo, activo_cm, estado_migracion, servicios, usuario, fecharec, area) FROM stdin;
    public          postgres    false    210   "       8   �  x�ř[���D������@&�	�@?,��-���ڒ<c�4��xz���A2���?��6�h���1�X�����Fl#�>���6�>3��[��K�}�Kns�z�?7�n�������?��ţ#������Xc�u��ƃ�1�q�����s��8c�Go�o��=�<����-��>�ٷ1��ˈ�﹌�;?�?F<y��mo��{7�7�A���x�JQ˷��#7�r�*�x�ѓ[α�ո���ߕG�\���m���}�����G_������z/���N����D�/q�̅�5�ܙ��g죏�N<���mwި�G'�;k�y�G���%���x[���n"���x2۟���2�xDc���$��9�S��b���=x���@�s��bD��Ы"��9f���e@�<d �8�x��	b{o�1,����s�����DPI�௛ 5�zg|�7a���n����1���ه�.�D,��;}3�praF-l�^+��d*6�}��+�����0�'�_O� =Y<7���4ɜW6�r��eoĂ�5��ـD���y��o�A�|7����&����p9�݀�8�L�I�s�+#`s�ԏBDn7Y&0D�� _�%��m L;�3B�v�^���ɬo���-�n0���w<	X�`��s��'�ED�0C�A��\9����j�1�0�(m��CM�A�Qb��^Ԇw�(Q��!�6Y ]E���a��-�ӡ��B٘b����&ỹ���v��{Zy��΂?�P�H�\�J����G�	c��K�DI-, ��5g���f�v��@��i�AүP�׳��C�Y��Cq���fp���\�=��Tվ�xbhW��u�Y�_	�PC3�[�i�5cq(%�P�4RJ�'!�T�v˓��+e.O%��"�	���jd��>� ������<Ղ�@�=�s��.���Ս��Qzy|�h E�"�-�r"ո�2�5�3�R��^��i��sV]�Dw��|7;4��+C�(�'j�b=%Ť�m-Y��5��(�bA�7>���㩌#6��=R�������@"4�n&�{�RJ�C�1��zz�\��_�����*�/ǎ8 eȆ7�2���Rh��e�� ��SPs�xw�Ƞ�^
ĉz���ë��h:)��L�L�\<-�D�x�*٨['t߈d���9���ܬ]��c#E(�
��X��l ��k,ќ��=u�Y�������a� aPP��|���)�N��-� �K��4����VD�)����(͡��x=�O_����|L�ـ�m��ڄY~K�iŁ�D�NFI�F��KE��]�+����{� �uZ��[{����h���/��%�� �P���%�>aK{ }­k�@�P�1L���\I�\�FI�(�M�)�%�Ch'�F��>��4�(�-$��ziAJT\�+l�Gu�-�`�ٶ��*��撐��Y�<*E��4VIÎ����p��B�K'��ܖ��f�MV�JbQT���u�х���OU�i�U\�՞6'EmGS�*�޾����� kiwdGM뱌�������$ZO���Ju��AF0N�O��"��6�uSu�Xu�~	��I����FX^ݎ'�6�l �V��:�����C;H�#vg����&Aإ��Vpj�S���azظڊ�_X�u=J�B�=� �:�0ΚQ�{xб =����Kj9����\]h5d�cִ�(:H�-��j��������o��Z"��Z��m�L@l�-"���!��N�6���\�ŧ�)�ӶD�0��|��n�GE�R7|��������l5��Զm�f5`��LE:W_����Ç#�T1@;J�G���ڍ�.pb�R�ղ�%|A���8!�9��C��T��v��=�"VU��dVb}9(Av�.�W��V��P�F͆�WS���"F���S˹���RԞ$��'<i�`�:��"�)�����wK�*K�:����;D�*Z ����էN�������a�[ ЩSʷ�ԻT&[��0�4?+��p�E*V=�u� H؛Ɔ'Bҭ����*{|ǉ���
*�����3_��!��������1C���ר�i+�v���k���6��N�i�ְ�%��SƑ��k�"�Hz��x���q$n�i&M�<ZP�btB	p�]׳J�e):��������x�z��&��w�P�-A(��$'���Hȇ*(�q�Ye^^�#�׽Cm��~���yb4��}��n\��8��#ݚ�!���Q��`wa��`�k��:�0;�c����ŋd�ѓ�-*+���f9���z��7�/h} �P[4�Q1�|��b�ġ�4[���Ug���6���;�sǸ*T��5.��~�x�h��^�w�N�90!y�]�&@��rׄ�V�E釞"�c̀�,���s��(-h��W���_�k:�Zz�磤���#_����Y�j4��S�μ>�}�C�j��k�hK�E��0�N*Ữ�>ݱ��ʓ��+o��.������j��6�:]�p� �� ��,ڒ��b�mLI�ŝ�(����O��C	i����	nLys�;�2;n��t�ɺ����m�����!1Z�s�iؿ��4<1B�u�}��W��O����X�
�jԬ��Q$��j+2f!�{T�8�	��>���捎�S��~ٖ�����(txJ.�Ĉ�i���w�=�⃘�gѶ�GYLL#߷0�c��:�ѵ�v����i����d��8�ت��:ej�]�A=�r���r�5��;x�� 5}|�0ʺ��VM��N��Ã[��u��ꚰ͈����<I�%ؓ���kJM�jPw���r��(�a�`��@�-:\�+�Hu���p��'���N��.�MC������dI��VK,p��
�.�Q�<P�j�-66T��\�<���}{NQ=ulߝ(�x:�tF��A��:"c�$��d�A��F�Q��w�v��oѾ�\���:,֙��r��^�/�6���.�Y�O*$�ZM*�9��~HL϶~�<4�3_B��W��qW��a���fæ׵���{ĥ��;��J�^_p�p[E�e|�񜔤����37"��B�ÞSj�J��:-�G��ñ�&�����Tv̮ɽ*��r؛Z������eX?PE������Ym3�������!i_      9      x��I�$ǲ]�|����u��
���5p��s42��	� �%� @eFxc���m����]���u�u���>�Y���ޟ2Z�g�F�����m,e��hc�������R�\z��^���1J����K��h�ϣ���X������e�'ԅ�k��m�s���4ƴ<��g�ck|��k_F|X�ϾZiK�������R�����z�����5���;�t[=���qmkim���u�?+��o}�yF||������>j������2���=�m�[�����p��߽��e�|ֈ��s9�1�~����[\A�ĨG<�u�2׵��G�%�=�<>����o*u�S�um�u�K��j�ykӈk��x�%.6~����6�1���OʟZ�����d�U�N�Q�>♽��rķ���w��K<�˫�[\A�~�Y<�x	\w<�Xq%WYK\W|R�S}�W0œYbu�>;�x������x�s\X��Kܗ�M�Qbĝ�o.��2�w��2�>z��xC��j���ſ���:�U�
�[Z����x�}��t�%�T���+~��	v�{\=k �Ը���;c���u��$�x˘
wO�뎕�b]Ľ������+��;���qs��qu��m���cE�'Ŀ�ʊ����^[\q\n�f|��w�U�-���t�~����9�W��������o��ߍgVx���w���-�W/[�mn\��9J�����a�޶ؿ��ktagƂz}v�A�?_{v��7x���#������ս;8v�ܗ�Ʒq���6��:z����l�M��*~?>�H�	
w��Z��:X���O���B�q��z�����,#v(��o�9<�����3�y���9�K�gw���Γ�Uϭ������1�4b�%��z������
w>"��p��v�����Ǫ4����9sb-�
��2�e.�b�^�jgO�Qb7�S��,γ+��*�k|�X�z��Ž��U[|v��XK{�iܬ��
��s���9�ꈘ���*����ňss_�#���x�S��x�<�Å}�;(N1��ƻ��y��ɛ�=�SD����$�LF����+◛;�0�r����-���%���a�F4��-�ѱ_cWn�q�q�O�bS�Q��9V�4J���b��u�\b�����g2��Z�(h�b}��"O�X����4�-O�M�O�;8M#���r�Z�w|O��J����s�z�q*�x�5��M��{D<o�o�p�ň��a�i��I��X#���ʌ�g��읬`-�/?{�W�q�s��+8�x*[�-��\Aİ�x��1�݈�]��5I@�x?D̊�F,����wG�'�Ɵ�S�B�E��x$T�|[����N[�R���������9�N�i��o�G��U0�Q��������mٗ��;�Ugf����Q�7ѭDl��D<"\��qj�N�����i��7n2ҫ-~�jS��H���UuR���XFq���Զ��b9��H��@�Թ��P�1�.�#:n4��5�Sl-n��
a�ǵǒ��*n>����Q$��T��4��Esl��o%n�4"�X�;K�W�w��aK1B�7���#\ǟ��Teec��G����~w��C"��/0�5��<.B�R^�~2�xi,���y�)D�R�ø����T��-� �4�{"�ndE�OsFrR���x��g��K�����H������	��z�����7�k���n��xJ|^�	�ϖ{#�4�E�+�����->1�c�ߍ��#�ۚ	��J\ث�qS��8��\��3c��x{�c�]�;6�\�����m�7�;��S��X�4}��
c6^���7��L?��)���D�o��"��lg���r�4<�Sw��Z}�3&ʊ��vZHD<�{�w��&
�X_m,@�`��F���O��9��}bL��ͅ��L�!�v<řfD��#���1.>���2�C���
�A�Y(���&vC��ƒ�uX���B�x�J
%!-�H"�)�r�����=QG?"I��xϑ������[4���+�����w�O����ƥ��zq�Rrƻ����mA����_a����{/ŽF�W;�xT�QDJ+.���S%��X��:��BV��
{-����ǟ=��Wʱ����Q)�xs$������ϲ3c�WT(���� S65�H�H
E�����(r�jM�bD���;b�=��X޴~H��Xi=�k��_I�重|��7��e�+�`��i�s#/�"+2�LD��'���ҿ��q5�UR,kb�Ei|	{�Bb!��식o2�b�@��;�rRZ�#�(In[�e�p}��$�Pz��84�'9!�N�$o�ޡd��/�Y�,m�x���i�pGF�(��[J�1,7g4��g2�Ş��[�Lq-�X5�X����_�KV=	7J`�*�j��oz�V"���;9��^ȔX��E�9U�;�<���I3�[췅���3(����\��EG�{\��W����i�QU(��bJg���
�q�p�şZb�.�kq�)Y��U����"�X��ȣG��P��-d��f#����<=#�Ӻ&��>�/l{�Y�u�,(���c#�P��8}�n&rY�Kq�k���8���hڝ��=vu����x~�v����Z���t:���wC���O�`�.
ډ�V�%eĶ��W�$W���0��m=#�M�)Ώ-V�4"n<��j��"z\�U�s7������Xđ��O��s����1Şz�;"�ㄣ8���;���q.Źm���*��I�k�7_h�ũP��j㾉-.����;�</�Y����-I���كZi�z�k����3-���1�E���,��dB��G�b�������;�o��ϔ�jv�=��l������e����P��Gȹ�l��,`uP��LM���x_�WJ��dH?��}h�3q����,$a����c��GH�'��,�4�,��qq�sV��G#��6��	n��T�,�(�����e���𜎖��G�f"�F��)�ם�S=c�05�b�c�O}�w,Wrfj��ߟ���XE3�D|��Q@؎O�x�$~�p�;�3�H{�e�)������v��l<���'ˆJC�3>��1��3'�(�LM�a��{�m͊t��n��f����8�	���L`i4%#�s�9�a�e��N�H�H��b/��M[h/P��X�y��ܙ�RuZkg&r��;��}!�Ez�F H9��MG�`�̉A����콞�I��6T�z�������}z^��W��?�L�͎0]�ݸ��ٸV���4f:�=C0���A��]Y�R6H#@�z���p>@q�o.Θ� E�+���%�b�q�_�4�p�ۦ9�(��$>�E�����e�6���Ԃ�es�=ͱ�r�]@�3�D$��㳟���N9)a4VA��8�X&<�_�)햸��k m� !���ItX�WD���{�z��T�+�҉�d�M!ʹ�cs�{�q$Dd^�H���4����������Ol��]XE�S�Ќ�b�1A���fR�8V!��MqWG���y�|1�Y\÷�y�¸���#�{��s�S��HZcW2�<��)��fF(r�H5�Q�t+8�����J�����x���46�L�B1�u4�K�g�q%���1h�H��D���8eNl�1��k�F���i��e<9
�_G㠽k�#w��2�y�d�.��֍W�V!��0۫mc�I2�8>cqLL��>�~��RM�*�HS;�5q-̮�b�	:�[_�T�x���'�Wn�?�sw�0��Z��$��y,���Ri��u|��7����Vw�J��b+�m�P��v)V�F��=jB��ݒXm���ҎZ�å�Ҵ�Cl;�775�x]����U�aJg��+�$�#����4]��&��Ł���#��'�ձ	G����qlpb!�=��DE��φ9��x�0I�wo�.vV<_:?���F-P,�iý�Z��~��֩S�v�5�ft=��i��`�]�sh2���*+��'9r�IǍ�ѯаҊ��%s|N��bq�S�ŉ    1Ȩ��ƙMc���F/f!`x</ö�Y���
|�,�B�&=��yWc	�i��˳=J�H�B����ۓ�����Xh#Vw�hQ.WZ�^N��Ohx#4p�ЙE0��JN��-['S���a��Y������{Y1�K#kp�M�B�M}�F���Al�<�b�l4i�*i	R��!ʨ�h�	5�ae3ϧIZ�h�rb�x 9���0�*��i���L�o&���F7��(++�N}���L��%,��2����z5Tl��B��!��ġ��q��_�W���I�F��9�~<�ռ���v��'�Mxm�ͦ��]�x�������Pޒ��o)�[��L�kriO���^	������h��ٙ"��(����2&6�b��"pqJD�� ��g;�����5� �e��/rJ�VJ���B� '7��A���##V��?���M���@b��We�kϾm\��1E9��\ׁ�����Ë7�Sh��\��ݞ�*d�.+��X� ;��0~�$�|$J������vJ���v@��)p��E�I��8Eߊ���0͌�~`����`�\i\��_��iݔvQ���sO��1�oy��cL&��/� �ݫx���%��?�ng�ֿ�W0���y�8j��GS�^
cz�5~~6�ȍD!�:"��S�3.:j��~�p�6�� C?�����	2��	��z�tbk0���/�w�.Sr�����>*K�d��#p�-��Q�|���BY��X���3l+�'i|o�r��6N�3��8	z&"~7ѹ�]�����j%��q���r�|�S5�uq�������в�ro=a/`��s���H�a@D/ҷ���x�Έ�@W�?�V�i������!�٪��X7��D%��3���7���ݑk�2�KXx׃kf�;۹2��@�i�uf{�y�W�`�;:� �l�~�-��?�h����I;bQ�<[���J�^��G�o����z;�OpH���T��;��ڸ"�����8���ᛧ� (m�A��p�n`9����"bh�w༴C;�xZ��� �,�A�jPH����yw�A���o<��]�N�fyL�{�ٓ���1����@1VQ�ո?07�\A�T�	l+�c�U��L��@�ķ��&E��lK���Fi�b�0fg0��3h�wH��Rg�/�*��j��J���FVp
����<XBS�ыH-/?��Z#��ʦ4�<�&�8��O�T��X:m1������Q��t$01�wpI7z|�m�$�L5�5:�W.xlG�*���51d�'���l��\D��2tj@� �� �Ӎ�4k�J�E�W�I֫��84��3N�N7�e�0�����-C��R�2���G6n� �0Xi܅g7ӕ��NI ��/@J,ڕ�?� 5��Al-�G9�|�D��Ę����	!�UNN�~�~ܕ#�؜���Kc.wuG�q<]9_+�^��,r��E��ܓ�s����jg�8Kg�-`m��ʝ�S!G|�6�^1�WS�VѶ�>gz�lC��� bi�.c��*����3N|���t�Љ��d�7�Z,�Xα�I���7P���ݬvDF5}��:]�>�*{l1p�"Z"pKv���$�EU��'�U[���s��V�#n��6�]<Q�C<���ep���Hk�*>�Zö$wv�1���r6�A�ݗ{�3�zg|���x���V@�=[�4���;��w*���Թo:�� �R-��I�Qb�2��Y4�@G���Cl;ԈA泉�m �m��+��H�3�#
G�ƃ��B�˝1�m�c�W�� $'�+>����h���>���TL���)�H@X���	]P���>�����&�h�h���$��k�P�zx�P��� ����+"$�)�Wǰ��Kx��%���R#u�̖���eɳ8�}���MN�X�t���e�*�s.� �&4� ��e�@ə�ӧ����a��f�-�	s; '�M���i�Ϻ#H�ۺP& �q��v�:���j�e�#'���
;8�e�=B��6�b\H�c����ٍ�Cp��J0w�MV�9� �#�K뿔l]
4*��� �k�ɶ%��%ɢ��32S��B5�1�3�V��E�A�<h����#c�ǧPE��l�wNgq�4��΀� ��3�X$kþ�;J2��nZ�0��;`��(�HI��:db����B]l}f�v�A ��Hf$� V7� 8V�͓�1��AR]8b��^����G��fC��n_<�y��J��
]�`H_ %��8�!~��PF+���L*�#�l��gq� )hs��b�ZaP8Sa�l�@��q2�!���c8z淜�Y:,��,�~�"F���v�Pd �U�i��p�D�b�1��2-�<7�h�¤�m����j162R��A<[�b�Ͳ�ǧ����,��^�9ӯ(��d%��axYf��e_(���$�H-�,|H_��j
�z�.pPA6�흺y�I�5�oH�����e�c`�T�4����ǿ�Tʦ��}��u�e�2����쩓h�L����NW�8a9C�i�oh�lx�qCM[�b�'��PHL���K������j�mh���d>��i���LƝp�Ex�'��y�A�����w����r:n�1��f7X%�NZ�T���$� 7iS�_���HT �z`��ꭟ�*A��Y�6fՋ�m�7K�xЬ��2a=� ��X�4�9������`��h���������ڀ�O+���Ր�QF>'��J�o��7�� =aʤ��#AE�"[��]gaL��0���ބ��];�֡��l��
T��y�)����	vƷ��:�)LpBl�[A��$�%��@��*��z��Z&���#{tk�-���+�'��u\��@ȧy`�&�t��X�F���l��B�'���*����B�l�Vz<���`�X��<��[h���P!���n4��4lr��TfG�S��E��gqd�_��"���J�K�K=�M:�ĒZ�8�l.j4i%��h�'IKI��!��>,������5�3zE!���͂���7���<��h���Z��tD��4� YAK��m����Fy�c�ƿzB��l�e��ƓZr��X��b#9=�,5�T���b\�ɐ�����d�Ƨ|�Sr�����ۄ6�J�L!������$[���N#4�3�n��7PҝV{oX"�ζ �2�g'<D�qWk���rN7�"4 ��yUrߕbsi�7�
	y���- ��g�[�@G4!P��n� 
�Y�T�y�B7X��5��O���U�࿼���;�T�E��X% �=����3�����)fޑ3S{G�#��:]�X�fH�@8PC�CQ Z6���Fh�̾�8��m�ڗJ�:p�ap�\+)���.�*�j�("��¡�P6:͆��3��v.+AV�7?Y�)F}f�ה��{;`OJz��H�Bf	��=��lU��	�#�&�`�۝�OL��:Ē�0��F���R���N�d�2�cU���'Qx<j�p��#;���_��Ob=�$�0�Fy<��8�$��������c�7��<)e�;40pI�/� J7��@!0ǳ�j�91HX�,�|�`�1��Z�B�'��LL�/��V����ҷa3�V��C�e���ƌ�M�~4�\&�~�I�48<�lb��]�D�%�3�����\�&s��[g��Xm�E-�,��x\WGDeȦv�<N9�n�<OWƺ���E�a��8�՜D� �$�F���/ �!A8%	%�T�����1�����^X�r:���$���oG�o�k�X!�K	g�]���E�h�^PM�^����<	`<�iar�r�I�o?<SX���&�ԄjnG���Z�?w�1(+D��M�V�0��"�a��;3��e�L���P� g��&�ic����?$v2��[�i�r���.�z�8�}�v��������u��p����H��L�Pb�ܞ    T7MT��^�z�Ǻ&�~��6�9J�Ohx�4����yRS���f��6Z�]�6G�T�ՙ;�
q��<�0?����oeV�P}���\��p(;�ħ�F���)]�ͱ�O��ѧ��P�Hͪ��2��:ᄱ�9����U�^ `UN�m}J�8^A!Ѓ�P��#̉c����9������5�Q��l�uQ�B��m\���}I�|���C{���Bb��ο2��	���"��K�F&�'a��Ư�?�DQ����Y��+2���@A��ẽWB�ѥ�ަ)=�[i�"k��DP
��:�l'���!�D��&T	�0]fJ�dSg��H�P�M����<P�[=>z��-�8�6�^�;�I��,4��k���l��^X��� [�����/n(.(�R����ע�|A��BC*]��B��B7�:I*�*� ��h�rr�k�S�B ��uT�Kd�Y���L��GJIV��4�t6��w%�Z�5B���*�6o�����i�: ]�RKp΀�S�|bZ��@B�E����6��؍ua�hڋ�d�-�A:4
4�%�"*�/`ZM
� (����~��5Ϫ����CV�%N � �����6Ā�C��[�(�Mx:�l�M���_P�1�z�5(��"x^��9��,e���q�D��N��09-'� �i&�u5��@ ��B;� %���$>���(v���+I7(Om�/�J���w6`P�l�G�0$��ʭR+З�g|��`G��xM�}�Hp�P���$��l�1d�m�hVGʉ�$\�K���TJ�0��-g��4)?����b��W������I�4U�<���)e���g�*���^�8\V�3`Eȱe�w���3��Y_�4F���5t�i�x �l�.�v��]2,��H��̨��s*Vf��+�u����%��R~j��Ȍ{��F
���R��6ۑ�h���!Ղ�Mx��@]��2���gr�騩1�����̆S���pl�X�9��B�e�d�6��D.�	o//�^����x^�,�Tڧl,cB��b�Rjv~��n�T��2)��<�H#b�4�v�-� #������N\��:�Ф��^:Y g-J	����b|!Mu�wu�b˓;-ʫ8�o�R����''߄�w��/�)(wV==V�F����dAKM5 ez��	��xVu�q�<��(�t�TD*0,XECꚣw�vAC� @�z?hI)�:I�]��f�_�Һ����{]��Y��`���@�}*�߾�ϯW��0�HID�Qs��ꒅ�2��^ S�HNl-�XlYĦk�~54y�\ �᧹��"k�;��B����QI���샆�9`����;P��	Sgv��2H���J�3���}W�(T�3����M��sZs*���y!��%EFtAҩ�I�N��nZ��YF �+	kj�����������h��`G$L<�M�����!��L�`�\�,�<w��Ҧ�?�@�����.^�Pk� [������,�kX�;�D8a۝�@V[��J����٘q���G�[rD�����t�4��--1ߏ�]�Wei	ܶ��c��X�nP�^���kKm�7�N�д;�����Q(�	�.r48]dN"3���Z��-Vٕu����*�"�A( v�,JQ���bS����� ��=�8��oM^'ʈ�_���T�܆��Q�)��	t�S�+ 65}�P�Q���������;�tq�]�,�XXm�Vim�0��i��є���)�6�O�*�POU� |�-y\l
s�G(C8�X����#�ב�zUHi�d]U��Ac���Z# #�Sq�r8J�9 |�{ ך	6x���m�*]�*:���49�����f�-%��Xtm�nB)[UR�4��	���RH�!�.<M�~��G*�
%a�˳����	��eK�m���{��� ��A���xG1v �v��rB��������qIfE]O�{��Si�f�WuH�U&��,�"���)4i�q�#��Xl��BI�M�&��t��o9��M�܈/��a��H�"  ��ssj��~O� W��p�q��M��@ow��r�@�ZM�#�Pr$�f����A4rcT��Q��T�c�k�� �0���K�Sٝ#��-�d��It���ߙ��~�����𕞷�h�U�Q���	P�۽$��,A�B�-C*[P�	n͞=R�N�����vQ~W\����P�7j�h#�/�h����X���4 �{�L^�̿pW�t��TXl)1ZW��i>Ds�%U:zjȠhɣ^D����S��t!u���t��]�AT��L�h�Dƀ�����=��f6��(���8�_�%�����_'ȠȤ��l����h��o�~)�y�D����l��? 4��Y�bְ��^=�RM�*��tXA�����8+�P8��O,�2�ba�R�`��p�{����F(���7
�mb�]kK��.sh��A	�x��𛧐றcl#���a�&�Ez�����;Þ�«(:E����i�*�&
�Ư�R��G<D��g	�x1u��S�
AK`�ޱ�9�i�]ିː ��8z��ę�j�	�xu��]�\!�X�:NUY+Y �� C��IMV�]w�����)�_TWa(��J��¿��C�_?�#C-HG%7��)
0>����CC�2PH�Z�,O ����Z�����2=<�F��G5����Y`��x�tpW��$E2~�ް�[Њ��;�D��]�E��.�]@AX� 2H��x�-Jv<,w�j'�;���b��]�S�	d>�*raոI8�`N����X�"���/x��y�Xͤ�z=�Z�SIKK�lB��S􅚪B{y)���#��l�ѡ��_�W��Y�$���1��خ�y�G �.�E8�;	��.�iT��ołɎ��Q��0[HT/�t�R&�̮�"��1'��]��Ǉ�<H�Ȥ��ʰ�20�)�"��(S$\B�7�����gЉ�f��Uk�&�����RQ�]#=��|���7@͌g���8�������-aiR�G�~�T����ϛ�
�ćy�z@U<j��V!�  �2d��>��a-�`��&�cN�~��4;fg��^Xš3B�Oz־�ȣ�3��
Jb���A���Xs�$o3��UQU���w�fkw��v�L����Y�j4&T����p8�4.�&��G!�	��#�r��Τ|�i �r�6�yuf�H@r1��`�L�e�x�9�M�EE���@�e`2}
V�]�z�{�UV�M�ogaKtvq�֠�*Q��<�'4��5��̹�Mu*�v�pA�n7��&� x�d��=l+��9mʋh�ƕ�	�O&�H��
ߐ�,�s�5��>"�������F�n�OVVPWFd�����/���FŶb\�Kp�]��H�ktBVu<6�t]%���A$d��SV�ڇMl�ۢ���  �K���/fq�m�ߒ�� }�¾Ƀ �P3��&�sF�uCdt���ُB\h+*�1;C����	��4M��V�C�x�?l��.-ΗW��ّ��w���Lu&|^��aI��5<�aFB����R�wS�C����Yc<�1�4 �H�o�K�B������I	Vv��d�� �Ȍ�V18�*.O�a6��$��!4�*�
�>
�K�4��p[�<_|�%$##J��iFऋ�D;I� �`�j!T95 )$_��6 ����:�	��p����d�B���*C�W�4�LH���\��z.[���@�$��j�^�b�~���|��H:	ǐ��%<Ħ�K�� �~�g�n��OX�RZ6"��z{�HϚٖ-꒳�Y�⍳O��MY�c��&�.��A���aM=Ms��9l.�)�=�o��t�2���)&bx�<s�U�1���g��fy�"��%� ��h^t͹TaZū�"�6�9�A8	�D̚�<"`ya?+G�v��L44��b$7����dQ�A8H�z�oX��C<!)ɢ�$=    �N�SPEJ�E���Ӛ0��V~�IF��g8�c��U�J9�^���F��p*���i	�,�a�R}cV7�R�m��]U`TH�p��6q����>��P^T�-n�zA8�#fp(��h��<��z7���..i��w<ܔ*��\��}��>(D����K�K^$xblUo�/7��ز�y�ӄ�X��ʷ��ImC�I��"�$tI��j�n����<�	�Ǌm�Ly�h���V|Q!aRw	��v��wE�E�ƙ�@�I!�9q�*�>>3dC�g����͉�*�Lœ6%l��)�:�n�`�����Ҫ�E��T)���O�.����Z���d@ ޔK;���Ls�5�zҁ�S��N*�Pmx ���#a��T����%H +�8�M��}*�K���I:]��R��yԋ� !6��(PO��^J�Z(>���C���|H2I���*�h G�H��@��\5�[�,����5�� Zã��8V<X�&�D^fqS���^���#֢'3�'���@��V��>�)�P�Jz��͕����D%o��7%n�hQ�馭����Nٷ�t(l"�K��8���!\
�� uړJ�;zg��C��av(��0)�X�坆����h��l�Lw�a��PE���]�eq%i0��e���k����j()�D	j��Y�Kc�e�!��R �����3��1T�b��8�D3Ao����LE��l(���*�.��w��=x�8�A�Ѳ��3���6�kI�k��&��P^$
��6�/�8!�t�U�T��Iю�T�������*C��፣A#��f�2/@�!7��0�)U�='o�퀞%5ТS��M������fp(i�B@��Rk�Z��V��i�2�_Q�oM�FO?�UW�I��baxA�N�v�e��&ij)�K�tt�6�h/^�U�dK�cM?A!A?i�0�" ���F�T�V�"��xW�Ի U$�Ї���
吝�A�NL�9:"p���mO�^��l��;�2 S/���i��2��r�On3^݂�#5�FA�y�a�ٌ��������I��<��}$��� hpV#*z�5���'t}��Ć��|�	�%%�X0Z����EWp�4Y)jX��V�0oQ��A$h~�0,�N��Y���~�R�b���!�C����T��(�*���L��u�P��F���v�}Cb�L�_X�Į�z�$�#�Ր,s$�[��ZLPtp�o1�V�A&���VV��*��$J:T9Q��a�/6�j�J!0�aG*8��^*l/v�f��.O�Y��l�C��)[3{(��� �M�i�qb��
�F��M298J�8=90P��I���KGz���$R��8��W�$�����r&K�b�&k�F)
JUt��$E�.a0��ЋݤKa�M��#J�#ϻ
�M�H�ͭ��R���E�b!ԯL	%��(���8R�|�;�wSd�	#�ϊ[�.�uS#��3�.�M�� D�B�ڢ���Y����n���t�	�#����^�&���o�j�*!|Q{MO�,��c���;�67T4zf	�W����g�q:V4�͒��CC[�[�j�/�M)��
��-�z](�R6������q��[ǘ�*��˰�5j�$���,
ze>����*J��;٠�^� fF�I�F`:#�ۓ`Ţ8��Р]��hdW�.�����%�k�+���.%"?��Ƀ�d:@ه��GcZ�$U�c���f�y��M����`Z%�٠�2�W�r@�ut�'��X/�+ő+A�73k\��=���d�I� ���1���B�P܋@�B���^ɭt0:��e2�qÛ��n�+p?@��L���gE�
 �+����qŃ��B?p��A9��(�
N��ER��t�V-��#�'8�������'�/X a�G *���ᘲsHS@c#ܹ�#61��V�������{֤��Θ\N�Zz����yD�` �������C���v�i����d��}lC)wj�
T�b9e4M���3�;��7���*sg7C>�ƈ��g�VNB@�t���fv��,ږ�(v�..�^ �Q/��8G���J�'xQ������V+TJ���J�^0�҄9U�ź�����(�z'L�z*~*��t�F�{җC�-0)���!����)" 6���+xpg6�	E:���0���ƫj���U�J����	�5/T��-��?��6Fp{���kT�GO��f�,j~m��S��yH��-��������4 �l�=W艪�Đ�HZ�!���	��]�	�xz�uU����R��G�&Rh&x$B$���Lժ�zհ��3u �9��?�ο�;}  ��� L��p~����x���jdO�����;��T�f�}�X@���A[u�I�ztC��6Xg3/4��C!|PмB�#�b3��mns��Gp�KlV���E"PB�>Xz��AG�mJ(�/+��W<�����7�=��s/(�[]�C�-av]&�Pi
p���b�vM�Uu���v\3A"��C�
sRx�=̾ل��?)<��3��"
C��?}˗USX�l�\��(���`E��i"�ۤ����`��;��r�/Ǳ�R�J��7�H}T~d|LO�
��ϖ���(��b"�II�֡��'�9
�qu���#=�.�=���i ��u��?.�m���5�I��b?��P���#i�� �(���&H����o�f���T>�Y���W4��]'=�C���2�r�>*s����p�)Q)���C2��'ʭIa|���ݔ�H!��廽�i�@Zs���I��
)JZ6�O
���B�W^l��	0
s��D�NhM�2I�<;�Q�/O&�L����3��D
�V/���4�o4�G%��3U�l�@�S��2�'4��ޥ����&R�҂�9��_W��R��x�i��G}%�E�K���9_���V��j��U��Վ��{$|Hi93�	�$�Zيb�:)�;l���q��a�:��{b#�������o&����TU��jh�@&�qx	|t=�j��\uAÍ���.&�
b?̠����vBc�,��F��u�1iE��m�f���iAS.�9�B�c����*���l1(�M#c�:D�!���	J�PW����O���kt+���	�d���D#a< �`K�h�
碑C�����')v�ZL|�v���mMV���)�11�%��5��"�ʇ!�M�fC��۔��Wfr��,�%�Ϣ)�-/6.��(�}����
~]������c���Sf�e������0'+đ�$�a���2/dR�;�ȏ���:��3V̟��*�܋���ݾD�<݃dv1$Kв�T�u!X�c;D��&�L�Q__�������ՠ�GQ�#7Ł�%H �� |��
z�g��U/.-0���#�h�r}�.��pF�I�b
O�x:����ko�bP�t�ӷ����>�U����b805�cȊ{�I�c	kmO{Lg������]]�n�W�.[��,�4	%�@Q_�y��;Mm�f �L���c��g��Kjm0�f��d�=uK)h���b-�pC����g햠�� v�a��H<m��Ij������:;췘|���T�=J�w&g`���@��0�/��K`:�aFյ����uO"�W9�??kP7T5�e�5�2/+�>UDѓ"^����DW��$w%��`��g�'�P�"Ȇ�-*7jH�F���lo?��/�"L�搐���S�����h�L@w�:�	��-z��CXz����c	��6HآY�0 Ն
�I5��6� �G)��>�dx�l^mC�
�r`\������Є�f+3�8��
˥x�|�"@D��Q^�/BF�d��c�p(�?9�_���;���δ1��:�.U�bk�t���P�Qn��R��8SQejl�"��8>��#6�/3��8g�q� )8�߅�֒��˰4�5В�0��  �"��G(�A�n(�W�&��i1��?����F�.�    nb]�n��%����V�W)84�#tѵ��hPP8%�ߔ)q�9쾋,p�����9�ّhX/��b��^�x�� �B�zG촹�T(ao�^*t=�w?j2;�,nE�g{;�R�d���_!'�>��@� {%��& �v�N�����=�gV�S�)�H���D��rh�Bg���I�U!�a��
'#�o�}Av6�ijsXX�� 5lڍ��2Aǋ̃Gc�#u�jV��U�4gٙ�c9v=�~$VT]� �}�?��H�&�sk;AP���ޙT0#G�|��,[0=~ v��6��Y�!�{A/`qt@�w�����d=Y�sgE��ga��$Š4^�U~��\&���4�I�ܤ2�����6�����dB�6O�h�);Sl�*u�1�?9Y(���0rW8q�:����Ub���P9E֩�|��bq4R�amtM-��:��3�7V=O�)�o�;	~P!���	��js�gNW��T}�b���ϫ���*�s'�����F��YO��ׂ��I)���Ҫ����$OWy�>KK�������-_mV\ld���		�ݖ��~{��{�n�NVϚD�Rw�]�Vd����yيBیA9MT�25����+��xq� %�T��l��6�Z���=2�F�g��U!\����Bz�`�����E��ĲF��n`�l�[뭃J������������V�/�\�Ǡi�C}�E˵/��!Y0��uh�H6���i.~��P�a*c�L̈0r�%4(����[V�]���&���5F�J�L
	����"!Q�f���p}Mp�Լ��o��Jcr���EPA+Z5�B�5�&�tԪ�(�_��06F�H�8]�)��w�� >��,I�4A&J�8c��!����+��a07h%�͹��[LD��;ATc�Yf�x�ɸl��}s:�O�տ�_����U��)���̫9W��vw�Ͼ:a��ĭ��}��g�`�	��?���A��I����q������x�����]�Rp���ӣ0un��>5>��I�g���%�����O�����Ky$An��$],q@�tV8�a�bۄ,'�N�ڬ�Ϫ�g	�s3ԆK�D%�Y=����|� >ǻ��lX0h��MU�*@�v�W�Y��0�YJ"<��ͨ�s+лȔ�j%�bV��"���o�Y�N��
O���%�$=���X�5Mm8�3o�D+X`�W6��2-6M(�U��Q5KQ�"��yG嶪7�t����Q������� YcU7�M��C4Ù�S$�L-U5�I�����9�ܮ�u*�2TTW�Q��5�ɂ\p�D��-��ѯyO����Aһ�����*.T���KmPB�h��!��HhS*�2V��Oy�|�IIA���9i(��O��l�YЄp�K��I�3��.���Ax;!Gb;9b�"py�^���f ���:?�"L�J�[�H>X?ݸ��k��k_��A�����F�����|ڪO��59i����d��m>i��� �P�R�O��ڶQQ��?e��:�uw�	E�ս�#V;j\[W��KaA
T���F���)��Tx��Du�Y�^�J�V#�y�F
�')q�tuB q�ŬKۂx0/	�#!�S���޵�BGu���O�K2Sx%�� 5��̮��a�`$�n�F<c%B|�I�{1�`9�Ciک����c��[cF�[�؎�M�`�#������o��,�b����Ew@�P��U	@�b�~���{M!-����2�_%�mW�;�ړ'���{�p
s�ϵ��=�V�x���NH1P!G���'�Z�G�A`,�u��Dl��b��]�v�������x(�3��w��ғ�[8�j}�S��n��Exh�S��E!Qm�YMCy���Qv>�%��G�|��0v�ԛ�us��X_�h��8野���U;֕l+v	{�)���<a�3��d6����J���$�x �<�����,����Dwc���9�V�M�6E/�������'�QX-��SL�� ��p�H�pOjٓ�<�����dх�ʫ�\�LaӸ����V�f\�����^�h�ӗ��x�6F�C->(���YU_=J�ờ-d9��l��ڭ����[}�xWڎ=�6�P�ph֍�R����#�-�P>ҐVJ�9�T�VAt��@���}��Y��z2�?����mۑ
�@�O@������ċ�.��M#ۆh����.�Q��-�dmW��t&��Kc����g+�1|��b�z*��z�a�J�Z�%�{�C�ˍ �0��J܋����Im�[�u%�h�8^�`�_<{ʑ�J]�lL\�n�{����]�6v۶�o��\�س�<ǚ�v�P�pU��lQ��GH������R��@aQ�U�b�������b��5+C��0@��2���`�*�{ #FNf�l����`�ȋ�H���⌫��i �9�Ex=�c�x�>��d�(܍P���h.kc��$쐩p�fbDH�l������4=yҩrĬ���Ó�Y�j�ɟF�DXs�8�a0�D��Va�ˆ!�����,O�ݡ�j�<�a��#3:e�	~�4��C�G&1�4ƚ��m
5Z�����2&Ǫ��[u�]�҂���M83�ySф)��ة�f��d(�c���e��Wq[>�H+B���Ϥ���.ex�W���b`�z�ͨk �T�`m�;�F�j�*NՂ�_{�(sV�c��T]�*�0�4� @�p��ٿ��4T�ʠ!.J(����wA�9m�V�@!+ͨ
��
U��ʔ���|[�c[��ױ^��_�Ti�j�B���"r4�W~tJ޳�*��uT>��CǕ�A�vZ�o��i�*�X��Ε^{�>��v�hu�mJ�D�R��;�O�R�B�A�L͙�8��tH@v��l�o��'�PE���qg�q�ka-s
�-ב�B�씴+���x{SfZ8��5cЌB�֥	5�0����KNtR�Î"��}�=�n�6�	D������W����N�֢{ �B�fg*E��K �<����o=Q�{V]�K`RvR�F����o���Ơ���~Z�RQ�R	�VF��qca�%�G.�= �z�)����e�^�'�g3R�;�JO��U���7�!�/�D�5���i��K�>g�V"%-�rG�R�"��>��x��]y5�P5A4�I����� ���%�J��x�eN������-�Fb3���h�)�+�\ad�N}�<�7�&��M��7��J�5��nP��[;�NI�R�N
�ͅ�\���/�OhK�"�F\�����3�_�ߖN�9��c��L�P�Cxܬ2��+���5K!\�L����C�n�BJ���E{��Ɵ�|p���H�|���ă�ń��̥��A&�M�����t�a�"���L�@���FσK�(��_�]�F�qϨj0w@�˩G����X���Vak~���*��6����LZ��"|��bR�a�`J
"��$ �G�k�·N4ĕt>2�E�F��oux���0Z��c��W+�E`��#cF���D_@kD�@,�(���E�&�!��Q�{Y�I=\!���I�J��4�JZcD}�U���[^�A�[ux���(���< ���j���Zi*iM��+�0*l��,$�C��(H3���M�2�]$,&H�-�N�L�]I�74MEJ�L�T�rUP_bQU���,:�RJ�-y�I|Q�rí�j��vﰾ!�;�o��!rp�fZ4-���Jt]��N��&�����߅��"��s�q�$�4C"�U�� ��a�Zr�f�:�zE��au�,Z�|f�p�1,nڰ1{�	�Og$��z4h kq�*lÙ�s�)�8a�E�r�r1�`ߢ���B�~���zh�6�u�jo�j~򢴌N�Y5� &z�LE�P��n20N�.�Y��I�`���fc�j���Q��H��W��˪��.4L8�:�FOkq��*�URE�\%� 1���cё���T �"�z@;R[kE�XB��*    ۡz�[�An�4���5_de@P��P�r�0��0��@Ȕa��i+]^2Ȏ2��a'�fR�'d)T�t"�p����
	S�%�'&��mʎn�[v�Z'#������@������[�����e'UQ �5w�HX߬/�(G��!d�������dV�r-��$Z���e4�ޜL�pЇ$d�&��K��:��
�GY��XxT���[�D�Jn����v���N=�`���]�Oa`�i�	�F�P!>�˵%+�}�t�X��nBU�:��&�p+'�<�k�fU�v�,Ma�.�-�*%����oж�L�G��7Q� �Ve�vݯ�X���>�:�f4g�RdC�$�⥴\m��q$�QRy�Huv<�����w�q��cJ2�`w�:"�q* N���| }���
*���T��I}YI�L�KDNq�^�n'��o�[��§Kcu"�T��o|�5hD���H�\B	����6��b�~J�������+�W����x y<�>�M�'W�r�Sv��⛮����|��@b�W݊;Ь�5Qf��6[��")�0�3|���p�3T�ߧ%8v�H�wThʍ�˄��~B�Ю�b��=Ҩt��`����=��ez�Ū@����sB��:���R_���kqX�Hh)�MatAYtޛ��W��6<�ϑ�XDI"�h�YG:�D<2��:���^v���� ��)a��.�PH��}{uBh[�,Μ������LG?���o�^~�۰��JY?�`d��ȉN���b�e�ǒ��0�!v	�XS�?�z˺�hM0�ΝIxp:��p'�J�\T�7t�9�e��5������ɮ^Cmtn��JIQ��
��ڡ�����1�%%ߒO~�����hI��JiA_���+�.;R$���H2�3l��5 �Xw�<g�3ɭ'�ÔE&k��=�Kn��y��4WA��TZz+d�W�H�Y
h�/���S����,S
8�;�?X� D�w!kUy&@��|������jY�?�,\@��n=��y\1w��X����� ^� �U-y=�K�T�؎"bӧ��Av���Y�#4~s=ҳ��֩od]M��A`̧o�Y�?M�������p��V��H,���6ݦ[� FY �U�Ӣ��ݕI$
��7���[ 20�zY��!ݿbnuh�m�l���q.�Ub:~���l�A��L��V�/�/x�Mռ��1-���|�a�6��kNN��LP��ޫ<kX�����s&�P�ۿ�$���-��,���E��F�i�G!H,Fc%ݲ_ _JI2FZ����%|)���-���rW�����j�}��]����^��;�:���T�#D��MS�^G5��l6�5�dc�O�����is���P�>ZR�`����TE��U�@��b�6קB7��M��V���	��f	��x��d����ʡ�����5Y,Nz�;��+�usK����[k6���<�X"�B��е�W�ܔ�N�63�@�i��w����M�&tcQu��`�¦�);�RaI�4v;4�/�g��$OK:`Q�~q�}䔸�|3�m� *2UK���Y�H۟��!Cqz�u�Ҥl�r���6	C~BӇ�[ϒ�5lHC\�t�� U�θ;�|��X� ���>�o �)�� u�Ŕ�!�C��Ys�3A@j^�ʊuy8�;�����fN�lź����8k�Fv[��gv�����;ŏ遂z�m�Ψp�����%�䨘���G!��������:TV{�:��X@�x�jĿ�o���W�#н`F��S��Ym�[/<&@ �0P�g�9��]r�1�����s�]���M(em6�[�� jnS��Z^���j��F n"a����� nΙN�N'ˀ�f�=�OH��tƸ����.zGЗH�ܞ�	�����yMCr���-�0V�����DZ�p����9��z��yn�0>���%NK��p�u���ʧl��>$sɦ�e��^�0���4I���b`V��rǶ��W�ic�<Pڈ�W�����XP)�Hi�S��aWs�����H)���VJ;���)N+A#q���>c,��3��	L�^0���4~y#��Ti�q��6���;�[e���ң��Ȑ�c~�欩�=�'d�)�HG������t�uf8lcЅ�y�g���ʲ5ك�����f��8��O:\Ă���w4T���y�3r�ẮW��Q7�=����n��ҨG���t�ft�þ}��PS���W�s����O�	��G��ùs��.�����#�G󣚪Ym$��v�H�1I����U��>�tYQtC�!q(����;����AK�,��cr�lOҠXU�4����T���ޢ &Kv�~��B�@)I���g<*wT�l�� + �]�:�5��pC�	�V9��]8y �o$lx@@K���ٔ��J#	��|HΪكm+*����Mz��(����Q�z��M0��x
 ���l���`BTN���0y~Tt����>:_�ʑ��ӄlk����sg���Vgq�r8��*HE��!�!���(�=P>�K����R&@B�����H���~�����r� ����U�ѫ�B_��t&��T�8���?0�&���@B΅-����Z�/�Y�|t$KwaRq
cA/G��.f}�>,Yk��y��B��2 ��.���R�3-J�����E� ,0����V~cR�Tb�-2xlAr*�3�nw<����i˛V@�Y8҄��-ҘVZV�B��/M�'R�6 � [y�!�w��)	�J|)ݢ�<L]��*�{We5z	����d��/�p*�k�H�H��YK�dv��&IM���bUS��Ԕ�;	e_!P�fO��N�X��NxMbh�5�L��5�z�G��2\�y��C\ܰ�L��o�Gj�%�!WoNb�M�fy ��Bm�j��⼜=�U7�Z$�R4X+^���H��Ob��>�c�
@y�o���,��N*.	_��27����NUQZ �P�m�Bf歵�&��w7m�i�!��ϛX��
�O0���1^2�<f`��C.�p@�e֍��J�9�ghATW;�H�`Np���S#x� Ն q�aD^9M*2���=�M�h��U!�!�\��c�
_6�%7��ش�Y�����4�����uWV5�@�L'���+�m���<%,PЃ T��i����;LĬE�-H��L�']��i=/H�5�%��bMNѲ�W��?)t����p�
�]� �ߩ��/2�G�/����/{���!�pcʴ�ܤk=�0�S�8/Ҳ4s�9m���n8����(��sM�g&@h����:°�A����;S�Z6���8o�B-UG�M�ޭ�%B�jH�ƢjLA�Z�q՗շr*�>k�ļ�4@�7���TEvN��#|�M{�)���D����X��b�m�Αåc��
y߷
d:h�4d��n:¯*��bk�����fr!�M<

5�����c�+8x���! ��:zL%�}i�1�i��]�������}ݏ��{/=��9?��UC��򰕮�@W�`���/�nj���I���<�_t`�H8i���R]U���n�E���8�e7��o�"gB��y=s`���U����8�r�ܤ��A_ے�E?Vqb��
�s�k�� *Q:�lM����~�+��>��&�l!�Ji3:뎷�ڇ"�i��&���@���Y��4���Sku�������X&=���E�
�C���xU/6eS�/jΡxx����(��B�N/O"�x70�~�(�l���l���%����PFK8����q�2i�?��S�u]�v�{��F��75��8iL��\/f����&�ŋ��-uICFk�{TsG�	�Bi)RkR�`��� /�~Ǧ�7�����G}y�ݴ/ɒt��Ľ!t�'���� ����?�,�ȹ2���W���ݡ�Ԭ�dU2��&s%��g��6����Zґu�y��Fn����"n 8  ��T^���Pj�	��ª�A� )��-�R�Ċ���?��w���	��cw5�t{����XӘ�J\���b��=H���R3L�B��|�Y�7�8����zeq-�v{	hA����C��e4�Α��3]�
���� �$���&Ԣ�'���#p�x	�Z�+>c��5eߞ�h����M�h<�v����Ԑ�E�3�P�;FY�S-|��!O�������G����ђ����7(���g(���u���ET�)
�)@R�V��]�� ~�\/���>��,��CY6�C ϓ�t�edub�$�*Rk�-��|Ő| ��͚��v��m�E|�O����:�	(���
'��TZx���ك�E;�
�@�(�x�Ѯ�kD<zwްQ�*W�w��{=�Y��"��M�`r�=Xd#Z���JW���9��&��,Tf]���;1�#��T�X;�����t��lPy���WEA$I����PKq|a�>�Pp�j�B��`�*���k��x�/��
vut�	[#c����������#X�b�tɤI3�|�F�"՚4Z��%��@������ip0��%�{R��Ti� a:�2�L���f5��5���wd�=�Am��;�(�hhg�r�B�{N�;�m]8�W��
��"���%��#ږ�F49��PŬ��h:چ.[�Z�*�ɬx�i��/�.%|�]�y&dY�;�����p�eP'�)���]��(i+�1��[n�����m�r�pD3��T�`34]ȡ�Vw�%�6Ծ��3)s�W%��-��VjU��R�R5[��h����յ)��3�m���E@��|:w�96<��i�u=����+=�ԢI3�J�~9��P��?#�)�X�f�1�0��޺V�$��"�h����9{m�}Y��w!��w�4�9��n��-Z๡G�^F���Vȳ♳˰�i3��E�/�/O��!�� ����o}s�5]} R�h�4�z�����/�y�PfXx�h0 �6q��d�:�"�d��J����Ց���@"'fˆ�����MG ��Gx{`�U��z���  ���#V$�_�$�\) C�kE#U����P0��R�CH�cF�e�`��ht�:���%۴e���D��M���gkts�8�⋝���8$�������\TS��{2�=]���Yշ���Ð2��zoj�-�R��)�6�fE{Jz+	��E8]k(J�Zb�l56�$�"ZK"���X�� �b��tD/H���+Ԓ��������ꄍ�Q
�Fv�y*��������g������ ����     